import mongoose from "mongoose"


const orderitemschema = new mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    }
})

const order = new mongoose.Schema(
    {

        orderprice:{
            type:Number,
            required:true
        },
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        orderitems:{
            type:[orderitemschema]
        },
        adress:{
            type:String,
            required:true
        },
        statue:{
            type:String,
            // enum menas choices deta hai ki ye option hai to yahi hoga 
            enum:["pending","cancelled","deliverd"],
            default:"pending"
        }
        

    },{timestamps:true})

export const userorder = mongoose.model("userorder",order)