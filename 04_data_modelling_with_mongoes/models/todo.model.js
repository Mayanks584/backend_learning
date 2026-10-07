import express from 'express';
import mongoose from 'mongoose';

const todoschema = new mongoose.Schema(
  {
    content:{
      type:String,
      required:true,
    },
    complete:{
      type:Boolean,
      default:false,

    },
    createdby:{

      // use to set a relationship or refernece between the models
      type:mongoose.Schema.Type.ObjectId,
      // isme nam vo rakhna hai ko humne export ke type nam rakha tha 
      
      ref:"User"
    },
    subtudos:[  
        {
            type:mongoose.Schema.Type.ObjectId,
            ref:"subtodo"

        }
] // arrays of subtods
  },

  { timestamps: true }
);

export const todo = mongoose.model('todo', todoschema);
