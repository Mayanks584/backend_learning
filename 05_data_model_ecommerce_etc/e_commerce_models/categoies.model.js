import mongoose from "mongoose"

const categorySchema = new mangoose.Schema(
    {
        name:{
            type:String,
            required:true
        }

    },
    {timestamps:true})

export const category = mangoose.model("category",categorySchema)