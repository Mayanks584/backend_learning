import mongoose, { Schema } from "mongoose";

const subscriptionScehma = new mongoose.Schema({

  subscriber:{
    // one who is subscribing
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  channel:{
 // one to whoom subscriber is subscripting 
    type:Schema.Types.ObjectId,
    ref:"User"
  }
},
{timestamps:true})



export const subscription = mongoose.model("Subscription",subscriptionScehma)
