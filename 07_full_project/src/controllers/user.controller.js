import { asyncHandler } from "../utils/asysnchandler.js"

import { ApiError } from "../utils/apierror.js";

// export dekh li konsa nam hai wohi likhna hai

// User model default export hai isliye {} nahi lagate
import User from "../models/user.model.js"

import { uploadoncloudinary } from "../utils/cloudinary.js"

// upload middleware controller mein nahi hota, routes mein hota hai - isliye hata diya

import {apiresponse} from "../utils/apiresp.js"

import jwt from "jsonwebtoken"
// we are making a method to generate acess and refresh token 

const acessandrefreshToken = async(userId)=>
    {
    try{

      const user =  await User.findById(userId)
     const acces =  user.generateAccessToken()
     const  refresh =  user.generateRefreshToken()

        user.refreshToken= refresh  

        // validatebeforesave is a function in mongoose ki mujhe pta hai ki main kya kar rha hu 
        // to tum validation check mat karo 

      await user.save({validateBeforeSave:false})

      return {acces,refresh}

    }
    catch(error){
        throw new ApiError(500,"Somethinf went wrong while generating token ")
    }
}
const register = asyncHandler( async (req, res) => {

    //     res.status(200).json({
    //     message:"ok"
    // })

    // step to register the user 

    /*
    
    step 1 = get user detail form the frontend

    frontend nahi hai to hum postman se lege uske liye model dekho humne kya kya bnaya 

    hai (model me se bhi important things only)

    step 2 = validation - user ne khali to nahi bhej diya etc etc etc (not empty_)

    step 3 = check if user alredy exists (username,email)

    step 4 - heck for images , hum user se avatar le rahe ahi or cover image 

    hai to upload to cloudinary 

    step 5 - avatar check kar lena cloundinary pe 

    maine itna kuch le liya user se to mujhe iske liye ik object bnana pdega mongodb me 
    
    bhejne ke liye  - create entry in db 

    response send karne pe password bhi jayega to remove password and refersh token 

    field form response 

    step 6 - check the user creation then return response nahi hua to error bhej do


    */

/*
step 1 - forntend se data kaise lete hai 

form , url , json 

*/

/*

Object destructuring takes (extracts) data from an existing object. 

It does not give or send data to that object.

*/

const { fullName, email, username, password } = req.body

/*
ik method ye ki har kisi ke liye if else likho email ke liye bhi
username name ke liye bhi etc etc 



if(fullName == " "){      
    throw new ApiError(400,"full name is required")
}



*/

// second method

// .some - Its job is to check whether at least one element in an array satisfies a given condition.


/*

Jab tum kisi property ko access kar rahe ho aur possibility hai ki uske parent 

ki value undefined ya null ho, tab ?. use karte hain.

*/
if(
    [fullName,email,username,password].some((field) => field?.trim() === "")
){
    throw new ApiError(400,"all fields are required");
}

// by the help of mongoose we are callling our database ki ye user hai ki nahi 
// or humne operators lgaya hai ispe 

// await lagana zaroori hai - database se data aane mein time lagta hai
const existUser = await User.findOne({
    $or: [ {username}, {email} ]
})

// existUser - typo fix kiya (exitUser tha pehle)
if(existUser){
    throw new ApiError(409, "user with email or username already exists")
}

// humne apni images pe middleware lgaya hai to middleware humko kuvh cheexo ka acess de deta hai

// multer give me files 

const avatarlocalpath = req.files?.avatar[0]?.path;

let coverlocalpath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverlocalpath = req.files.coverImage[0].path;
}

if(!avatarlocalpath){
    throw new ApiError(400,"avatar file is required");
}


const a = await uploadoncloudinary(avatarlocalpath);

// avatar cloudinary pe upload hua ya nahi check karo
if(!a){
    throw new ApiError(400, "avatar upload failed on cloudinary")
}

const c = await uploadoncloudinary(coverlocalpath);


// database me entry
// Mistakes fixed:
// fullname -> fullName (capital N)
// avatar.url -> a.url  (cloudinary response 'a' mein tha)
// coverImage?.url -> c?.url  (cloudinary response 'c' mein tha)
// toLowercase -> toLowerCase (capital C)

const createdUserInDb = await User.create({
    fullName,
    avatar: a.url,
    coverImage: c?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

// .select - jo field nahi chahiye uske aage - lagao
const createdusername = await User.findById(createdUserInDb._id).select(
    "-password -refreshToken"
)

if(!createdusername){
    throw new ApiError(500, "something went wrong while registering a user")
}

// Response fix: new apiresponse() ko json() ke andar correctly pass karo
return res.status(201).json(
    new apiresponse(200, createdusername, "user registered successfully")
)








})

// ye method kab run karega usko btane ke liye hum routes bnate hai 


const loginUser = asyncHandler(async (req,res)=>{

/*

step one - req body ise data le ao 

step two email password chahiye (apni marzi username ya emaol )

find the user 

password hai ko bycrpt kiya hai usko match karna hai 



fir usko ko ik refresh y acess token de dene hoge 

send cookies


*/

const {email,username,password} = req.body

// ye jab hum dono hi chahiey 
if(!username && !email){ 
    throw new ApiError(400,"username or email is required")
}


/*

ye jab hum ko dono me se ik chahiye 

 if(!(username && email)){
    throw new ApiError(400,"username or email is required")
}


*/


const user = await User.findOne({
    $or:[{username},{email}]
})

if(!user){
    throw new ApiError(400,"user not exist")
}
 

 /*

so jo findone or etc etc hai vo sare mere mongodb ke built in functinhai 

jo maine aese user model me bnaye hai vo mere function hai to miane aese jo const user bnaya hai

ispe main use kar sakta hu sare 




 */

//  ik bar ye wala code smajhi 

const passwordvalide = await user.isPasswordCorrect(password)

if(!passwordvalide){
    throw new ApiError(401,"password is wrong")
}

    /*

    jo mera user hai usme mera refreshtoken abhi tak updated nahihai 

    maine jab ye niche wala function call kiya uske bad bhi nahi hoafa 

    uske liye mujhe ik queery likhni hai or vo mere pe hai likhni hai ya nahi 

    ya mere pe itna paisa hai ki ik or db call kar sakta hu kya nahi 



    */

  const {acces,refresh} = await acessandrefreshToken(user._id)

  

    const loginuser=await User.findById(user._id).select("-password -refreshToken")

    // / know we are sending cookies 
    /*

    when we are sending cookies we have option what we have to send 

    */

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.
    status(200)
    .cookie("acesstoken",acces,options)
    .cookie("refreshtoken",refresh,options)
    .json(
        new apiresponse(
            200,
            {
                user:loginuser,acesstoken:acces,refreshtoken:refresh
            },
            "user logged in sucessfully"
        )
    )



})


const logoutUser = asyncHandler(async(req,res)=>{
    /*

    remove cookie 

    remove refresh token 


    we alos can make our middleware 

    */

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }

    )

    

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("acesstoken", options)
    .clearCookie("refreshtoken", options)
    .json(new apiresponse(200, {}, "user logged out successfully"))
})

/*

here we are making a endpont for our acress token jab bhi  vo khtam ho jaye 

to refresh token ka endpoint hint kar  ke vo naya session start kar paye 



*/

const refreshAcessToken = asyncHandler (async(req,res)=>{
    const incomingrefreshtoken = req.cookies?.refreshtoken || req.cookies?.refreshToken || req.body?.refreshToken

    if(!incomingrefreshtoken){
        throw new  ApiError(401,"unauthorized request")
    }

    try {
        const decodedtoken = jwt.verify(
            incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET
        )

        // usermidel me jo generaterefreshtiken hia uske andar id passs hi hia wohi use kar rahe hai yaah

        const user = await  User.findById(decodedtoken?._id)
        if(!user){
            throw new  ApiError(401,"unauthorized request")
        }

        // do token aya hia mere pe incoming - jo user bhej raha ahi user me jo databse me ahi 


        if(incomingrefreshtoken !== user?.refreshToken){
            throw new  ApiError(401,"refresh token is expire")
        }

        const options = {
            httpOnly:true,
            secure:true
        }

        const {acces, refresh} = await acessandrefreshToken(user._id)

        return res
        .status(200)
        .cookie("acesstoken", acces, options)
        .cookie("refreshtoken", refresh, options)
        .json(
            new apiresponse(
                200,
                {
                    acesstoken: acces,
                    refreshtoken: refresh
                },
                "Acess token refresh"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }
})

/*

make by me bitch

isme dikkat hai niche sir wala logout hai 

const forgetpassword = asyncHandler(async(req,res)=>{
    
    step one 


    find karo usko emial hai bhi hai anhi

    vo user exist bhi karta hai ya nahi 

    

    const {username,email} = req.body

    mongodb ki query hamesha ({}) aese

    const userexit = await User.findOne({email})

    if(!userexit){
        throw new ApiError(404,"user is not found")
    }

    

    ik naya page open hoga isme vo naya password dalega

    mujhe vo lena hai or usko replace karna hai simple 


    

    const newpassword = req.body?.password

    if(newpassword===""){
        throw new ApiError(400,"fill the password")
    }

    

    ab mere pass new password bhi hai or yaha password bhi hai 


    
    
   // ye mera bas javascript me save hoga nah ki mongodb me 

     // req.body.password = newpassword

     const user = await User.findOne({email})

     user.password = newpassword

     await user.save()

return res.status(200).json(
        new apiresponse(
            200,
            {},
            "Password changed successfully"
        )
    );


})

*/

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldpassword,newpassword} = req.body

    /*

    so sir basically user login hai or vo fir password change kar raha hai 

    to jab user ne login kiya hai to auth middleware chala hai or us user ki sari 

    detail us user pe hogi to waha se data le lena 


    */

   const user = await User.findById(req.user?._id)

   // jo bhi mere async function hoge unpe await lagta hai 


   /*

    so basically miane user model me isPasswordCorrect bnaya tha vo call kiya 

    or user me sari value thi user ki to dono ko compare kar diya 


   */
   const isPasswordCorrect = await user.isPasswordCorrect(oldpassword)
    

   if(!isPasswordCorrect){
    throw new ApiError(400,"invalid old password")
   }

   user.password = newpassword

   await user.save({validateBeforeSave:false})

   return res.status(200).json(
    new apiresponse(200,{},"password is changes sucessfully")
   )
})

const getCurrentuser = asyncHandler(async(req,res)=>{
    return res.status(200).json(
        200,req.user,"current user fetched successfully"
    )
})

const forgetpassword = asyncHandler(async(req,res)=>{

    

    const {username,email} = req.body



    const userexit = await User.findOne({email})

    if(!userexit){
        throw new ApiError(404,"user is not found")
    }

    



    

    const newpassword = req.body?.password

    if(newpassword===""){
        throw new ApiError(400,"fill the password")
    }

    



    
    
   // ye mera bas javascript me save hoga nah ki mongodb me 

     // req.body.password = newpassword

     const user = await User.findOne({email})

     user.password = newpassword

     await user.save()

return res.status(200).json(
        new apiresponse(
            200,
            {},
            "Password changed successfully"
        )
    );


})

// file update karte time uske alag endpoint rakhna 

const updateAccountDetails=asyncHandler(async(req,res)=>{

    const{fullName,email}=req.body

    if(!fullName || !email){
        throw new ApiError(400,"all fileds are reqired")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            // set hai vo recive karta hai ik object 

            // dono kar sakte hai 

            $set:{
                fullName,
                email:email
            }
        },
        {new:true}
    
    
    
    ).select("-password")



    return res.status(200).json(
        new apiresponse(200,user,"account detail updated sucessfully")
    )




})

const updateuseravatar = asyncHandler(async(req,res)=>{

    const avatarlocalpath = req.file?.path

    // const user = await User.findByIdAndUpdate(
    //     req.file?.path,
    //     {
    //    $set:{
    //         avatar:avatar
    //     },
    // },
    // {new:true}
    // ).select("-password")

    if(!avatarlocalpath){
        throw new ApiError(400,"avatar file is missing")
    }

   const avatar= await uploadoncloudinary(avatarlocalpath)

   if(!avatar.url){
    throw new ApiError(400,"error while upldaing on avatar")
   }

   await User.findByIdAndUpdate(
    
        req.user?._id,
        {
            $set:{
                avatar:avatar.url
            }


        },
        {
            new:true
        }
    
   ).select("-password")

    return res.status(200).json(
        new apiresponse(200,user,"avatar is changed")
    )
})

const updateusercoverimage = asyncHandler(async(req,res)=>{

    const coverImagepath = req.file?.path

    // const user = await User.findByIdAndUpdate(
    //     req.file?.path,
    //     {
    //    $set:{
    //         avatar:avatar
    //     },
    // },
    // {new:true}
    // ).select("-password")

    if(!coverImagepath){
        throw new ApiError(400,"cover umage file is missing")
    }

   const coverImage= await uploadoncloudinary(coverImagepath)

   if(!coverImage.url){
    throw new ApiError(400,"error while upldaing")
   }

   const user = await User.findByIdAndUpdate(
    
        req.user?._id,
        {
            $set:{
                coverImage:coverImage.url
            }


        },
        {
            new:true
        }
    
   ).select("-password")

    return res.status(200).json(
        new apiresponse(200,user,"coverimage  is changed")
    )
})


// payload ??

export {
    register,
    loginUser,
    logoutUser,
    refreshAcessToken,
    changeCurrentPassword,
    getCurrentuser,
    forgetpassword,
    updateAccountDetails,
    updateuseravatar,
    updateusercoverimage


}