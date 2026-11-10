import { asyncHandler } from "../utils/asysnchandler.js"

import { ApiError } from "../utils/apierror.js";

// export dekh li konsa nam hai wohi likhna hai
// User model default export hai isliye {} nahi lagate
import User from "../models/user.model.js"

import { uploadoncloudinary } from "../utils/cloudinary.js"

// upload middleware controller mein nahi hota, routes mein hota hai - isliye hata diya

import {apiresponse} from "../utils/apiresp.js"

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

const { fullName, email, username, password } = req.body

/*
ik method ye ki har kisi ke liye if else likho email ke liye bhi
username name ke liye bhi etc etc 



if(fullName == " "){      
    throw new ApiError(400,"full name is required")
}



*/

// second method

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

export {
    register,
}