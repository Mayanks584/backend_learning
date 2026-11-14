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
/*

so in some cases we have to disple the profile of the user 

matlab jasie mera youtive hai jab hum koi channel kholte hai to humko dikhta ahi 
iske kitne subscritper ho gye hai 

kisi ke chanel pe aya hai to true ya false return karna ki vo subscribe hai ya nahi 
 

agar ap login in hai to apne isko subscrbe kiya hai ya nahi 


 


*/