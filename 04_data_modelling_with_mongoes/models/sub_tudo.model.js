import mongoose from 'mongoose';

const subtodo_Schema = new mongoose.Schema(
  {
    content:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false,

    },
    track:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
     
  }, { timestamps: true });

export const subtudo = mongoose.model('subtodo', subtodo_Schema);
