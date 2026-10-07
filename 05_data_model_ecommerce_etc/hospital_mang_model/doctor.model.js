import mongoose from "mongoose"

const doctor = new mangoose.Schema(
    {

        doctorname:{
            type:String,
            required:true
        },
        salary:{
            type:String
        },
        qualification:{
            degree:String,
            required:true
        },
       
        experenice:{
            type:Number,
            default:0
        },
        // basically ik doctor mutilple hospital me kam kar sakta hai to 
        // usko arrays me store karo 
         hospitalwork:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"hospital"

            // isme agar ik doctor hospital me kitne hour kam karta hai uska schema add kari 
            
        }
    ]


    },{timestamps:true})

export const doctorschema = mangoose.model("doctorschema",doctor)