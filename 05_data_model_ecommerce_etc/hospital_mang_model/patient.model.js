import mongoose from "mongoose"

const patientdetail = new mongoose.Schema(
    {

        name:{
            type:String,
            required:true
        },
        problrm:{
            type:String,
            required:true
        },
        address:{
          
            type:string,
          
            required:true,
          
            
        },
        age:{
            type:Number,
            required:true
        },
        bloodGroup:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            enum:["M","F","O"],
            required:true
        },
        admitint:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"hospital"
        },
        docass:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"doctorschema"
        },
        medicine:{
            type:String,
            
        },
        quantiy:{
            type:Number,
            default:0,
            required:true
        }


    },{timestamps:true})


export const patient = mongoose.model("patient", patientdetail)