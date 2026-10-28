import express from "express"

import cors from 'cors'

import cookieParser from "cookie-parser"

const app = express()

// const port = process.env.PORT || 8000;

app.use(cors({

    origin: process.env.CORS_ORIGIN,
    credentials:true

    /*

        .env me jo maine cors=* likha hai matlab request kahi se bhi a sakti hai 

    */
}))

// json accept karni or uskii kitni limiy

app.use(express.json({limit: "20kb"}))

/*

multer se hum file accept karte hai 

when the data is form url  ko comfrig karna padta hai kyu url me bahut ? ,

% hote hai or vo har ik 

browser pe alag alag hote hai to uko confrig karne ka trika 

urlencoded() - ise bhi likho sahi hai 

agar extented:true lika to nested url le satke ahi

*/


app.use(express.urlencoded({extended:true,limit:"20kb"}))

/*
    when we have to my file , video in a folder 

    "" - kuch bhi nam rakh lo iske andar 

*/
app.use(express.static("public"))


app.use(cookieParser())


export {app}

/*
// req.params . req.url ?? , req.body 

app.use middleware / configuration seeting 

install do package cokkieparser cores


// 2. Data accepting settings:
// Form se JSON data aane ke liye
app.use(express.json({ limit: "16kb" }));

// URL se data aane ke liye (jaise: search?name=chai%20aur%20code)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files (PDFs, images, favicons) serve karne ke liye
app.use(express.static("public"));



// Cookie ko padhna (Read):
const token = req.cookies.accessToken;
console.log(token); // "xyz123"

// User ke browser mein cookie set karna (Write/Send):
res.cookie("accessToken", token, {
    httpOnly: true, // Security: Frontend JS is cookie ko chura nahi sakti!
    secure: true
});

res.send , res.json difference between them 

middleware - is use to check ki is field ko use karne se maine ye condition puro hai ya nahi 

app.use ik public middleware hai 

we also make a middleware for a speific route 

middleware ko lgane ka ik squence hota hai seekh lo usko 

 char elemnet hote hai ( err , req , res , next )

 next is a flag - next is use in middleware 

 

*/
