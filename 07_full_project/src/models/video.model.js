import mongoose  from "mongoose"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoScherma = new mongoose.Schema(
    {

        videoFile:{
            type:String,
            // cludinary url

            required:true,

        },
        thumbnail:{
            type:String,
            // cludinary url

            required:true


        },
        tile:{
            type:String,
            required:true
        },
        despriction:{
            type:String,
            required:true
        },
        duration :{
            type:Number,

            // ye bhi cloudinary se ayega 

            // cloudinary pe jo bhi hum upload karte hai vo uski puri detail deta hai 
            required:true

        },
        views:{
            type:Number,
            default:0
        },
        ispublished:{
            type:Boolean,
             default:true
        },
        owner:{
            type:Schema.Type.ObjectId,
            ref:"User"
        }
},
{
    timestamps:true
})


// ye samhjh nahi aya mongoose middleware 

videoScherma.plugin(mongooseAggregatePaginate)

export const video = mongoose.model('Video',videoScherma);