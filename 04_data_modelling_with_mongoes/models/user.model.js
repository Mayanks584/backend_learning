// how mangoos export the data

import mongoose from 'mongoose';

// mangoose help to make a  schema new keyword is use to make a new schema

// it is a function which take the object

// const userschema = new mongoose.Schema(
//   {
//     username: String,
//     email:String,
//     isActive:Boolean
//   }
// ); professinal niche likha hai

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,

      // also expect in the array iske andar humne error msg dal diya
      required: [true, 'passwod to dal dale'],
    },

    //  jo mera timestamp hai vo mongoose me inbuilt hi kar diya hai createdAt(), updatedAt()
    // isko second object ki trah pass kiya jata hai
  },
  { timestamps: true }
);

// new keyword ka work dekh li

// schema ko export kiya jjata hai ye schema bnayega mongodb ke andar

// .model ke function hai jo do input leta hai name model ka (take in string) or ki ke basic pe mujhe model

// bnana hai (jo schema bnaya hai uper ,)

export const User = mongoose.model('User', userschema);

// jo bhi hum model ka nam dete hai jab bhi hum mongodb se connect karte hai to jab mongo ke pass jayega tab vo lowercase me or uske sath s lag jata hai (pural)
