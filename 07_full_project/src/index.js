
// require() kaam nahi karta ES Modules mein — isliye comment kar diya

import dotenv from 'dotenv'
// in dono ko use nahi karte to nahi likha 
// import mongoose from "mongoose"
// import { DB_NAME } from "./constants";
import { app } from "./app.js";
import connectDB from "./db/index.js";
t
dotenv.config({
    path: './.env'
})




connectDB()
.then(()=>{

    // app. listen se phele error ko bhi listen karna chahte hai 

    app.on("error",(error)=>{
        console.log("erre",error);
        throw error
    })
    
    app.listen(process.env.PORT || 8000 , () =>{
        console.log('server is runing')
    })

})
.catch((error)=>{
    console.log("MongoDB connection daild:", error)
})






















/*

approach first 


import express from "express"
const app = express()

;( async () => {
    try {
        // Fix 1: Added $ sign before process.env and removed extra spaces around /
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("Error: ", error)
            throw error
        })
        
        app.listen(process.env.PORT,()=>{
            console.log(`App is listing n port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error: ", error)
        // Fix 2: Changed err to error
        throw error
    }
} ) ()

*/