import mongoose  from "mongoose";

const medicalrecor = new mongoose.Schema(
    {

},{timestamps:true})





export const medo = mongoose.model("medo",medicalrecor);