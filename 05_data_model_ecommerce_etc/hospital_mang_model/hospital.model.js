import mongoose from "mongoose"

const hospitalstru = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
                addtess1:{
            type:String,
            required:true
        },
                address2:{
            type:String,
            required:true
        },
                pincode:{
            type:String,
            required:true
        },
            specialhospital:[{
            type:String,
            required:true
        }]
    },{timestamps:true})



export const hospital = mongoose.model("hosptial", hospitalstru )