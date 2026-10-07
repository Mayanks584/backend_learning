import mongoose from "mongoose"

const productSchema = new mangoose.Schema(
    {
        des:{
            type:String,
            required:true

        },
        name:{
            type:String,
              required:true
             },

             // buffer format ??  
             /*
                jo hmari images hoti hai unko apni hi server pe ik folder bna ke rakh diya jata hai or uska url frontend me de diya jata aai 

                ya

                third party services

                aws bucket , cloudnary - video or images store karta hai or url return karta ahi 
            


             */
             productimage:{

                type:String,
            

             },
             price:{
                type:Number,
                default:0
             },
             stock:{
                type:Number,
                default:0
             },

             category:{
                type:mangoose.Schema.Types.ObjectId,
                ref:"category",
                required:true
             },
             ower:{
                type:mangoose.Schema.Types.ObjectId,
                ref:"user"
             }

    },
    {timestamps:true})

export const prod = mangoose.model("prod",productSchema)