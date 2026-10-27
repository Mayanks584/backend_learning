import mongoose from "mongoose"

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {

        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            // trim ka use kari pta bahai 

            index:true

        },
         email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true

        },
         fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            // cloudinary url ka use karege yaha ppe
            require: true
        },
        coverImage:{
              type:String,
            // cloudinary url ka use karege yaha ppe
        },
        watchHistory:[

            {
                type:Schema.Type.ObjectId,
                ref:"Video"

            }

        ],

        password:{
            type:String,

            required: [true,'password is required']
        },

        refreshToken:{
            type:String
        }
    
        

    },{
            timestamps:true
        }
)

// jo mera save hai ye meri state hai to ik bar check kar lio jake mongoose ki docuemntatuon pe 

userSchema.pre("save", async function (next) {
    /*
    dekh isme ik issue hai jab bhi main koi bhi save operation lgauga to 
     vo har bar isko password ko acess kar ke store karta rahega
     maltab maine change profile kari ye tab bhi passwrd ko bhi acess kar lega
    this.password = bcrypt.hash(this.password,10)
    next()
    to solve this we create if statement
     */
// there is two way 
// one method 
    if(this.isModified("password")){
         this.password = bcrypt.hash(this.password,10)
    next()
    }

    // now we are checking ki password sahi hai ya nahi hai 



    // dusra negative check wala 

    /*
 if(this.isModified("password")) return next();

this.password = bcrypt.hash(this.password,10)
 next()

    */
    
})

// custom method for checking ki mera brcypt or original same hai ya nahi 

userSchema.methods.isPasswordCorrect = async function(password)
{

    // it return true and false 

  return await bcrypt.compare(password,this.password)

}

userSchema.methods.generateAccessToken = function (){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
        // payload : mere database se a rahi hai 
    },
    process.env.ACCESS_TOKEN_SCRRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function (){
     return jwt.sign({
        _id:this._id,
       
        // payload : mere database se a rahi hai 
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
)
}

export const user = mongoose.model("User", userSchema)

/*

refresh token 


acess token 


ye sab kuch encrypt  kaise karege or -: mongoose ke  pre hook ki 

hook kya hote hai ye nahi pta 

pre middleware dekh lena jake 

*/