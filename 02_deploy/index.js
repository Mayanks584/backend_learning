
// dotenv se dekh lena 
require('dotenv').config()


/*



*/



/* first line ka matlab ik ki express variable bnao or uske andar meri express ki sari
use case uske andar dal do

import express form "express"

import express from "express";  // <--- Sirf ye line change hui

const app = express();          // Same
const port = 4000;              // Same

app.get('/', (req, res) => {    // Same
  res.send('Hello World!');
});

app.listen(port, () => {        // Same
  console.log(`Server is running on port ${port}`);
});

json file

// Ise:
"type": "commonjs",

// Badalkar aisa kar do:
"type": "module",


*/
const express = require('express');

// jo meri express ki functionality hai vo app ki matdat se use kar sakta hu 
const app = express();

// ki konse port pe run hogi

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login',(req,res)=>{
    res.send("chutiye tu karga login")
})

// slash hmesha lgana 

app.get('/signup',(req,res)=>{
    res.send("tu karefa dale sign up");
})

app.get('/home',(req,res)=>{
    res.send('<h1>tu karefa dale sign up</h1>');
})

/*

jab hum running backend me kuch change kar dete hai to usko restart ke ke chalo

*/

 app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
 });


/*

we also write like this we did not need any fucntion call here 

app.listen(port);

.listen work if we did not write it then node run line by line annd do not stay active

app.listen ka Magic kya hai?

Normal programs run hote hain aur khatam ho jate hain. Par ek Server ka kaam hota

hai 24/7 zinda rehna (chalte rehna) taaki log kabhi bhi request bhej sakein.

app.listen() hi wo command hai jo Node.js ko sota nahi hone deti! Yeh command Node 

ko bolti hai: "Bhai tera kaam khatam nahi hua hai. Tu Port 3000 par jaa ke baith ja,

apne kaan khule rakh, aur wait kar. Jab tak main tujhe band na karu (Ctrl+C), tu wahi 

baith kar wait karta rahega ki koi user kab request bhejega."

Analogy: Agar aapka code ek "Dukaan" hai:

app.get() ka matlab hai dukaan ke andar saman (items) set karna.
app.listen() ka matlab hai dukaan ka Shutter kholna aur "We are Open" ka board lagana.

*/

/*

question - mera ik or doubt hai dekh mane .get me '/signup' diya ye ik listen hai ki 

is page pe kya ana chahiye or fir humne ik or functuon bnaya ki req,resp dusre function 

ko kaise pta chalega ki /signup pe req ayi bacially dure function ik req kaise kam karegi 

ans - express manager 

Maan lijiye Express ek bahut bade restaurant ka Manager hai. Aur aapka function 

(req, res) => { ... } restaurant ka ek Chef (Bawarchi) hai.

Route Set Karna (app.get): Jab aap code likhte ho: app.get('/signup', callbackFunction)

Toh aap basically Manager (Express) ko ek rule bata rahe ho: "Dekh bhai Manager, agar koi 

bhi customer aa kar Signup wali dish maange, toh seedha usko mere is Chef ke paas bhej dena."

Customer ki Request aana: Ab ek customer aaya aur usne bola: "Mujhe /signup page chahiye."

Express Manager ka Asli Kaam (The Magic ✨): Jaise hi customer ne /signup maanga, Manager

turant alert ho jata hai. Wo khud 2 cheezein tayar karta hai:

Ek Order Slip (req): Manager is par sab likh leta hai ki customer kaun hai, kaunsa

browser chala raha hai, kya maang raha hai. (Yeh apka req object hai).


Ek Khaali Thali (res): Manager ek plate nikalta hai jisme khana wapas dena hai.
 (Yeh apka res object hai).
Function ko Jagana (Calling the Callback): Ab Manager kitchen mein jata hai, uss Chef 

(function) ko jagata hai aur bolta hai: "Lo Chef, yeh pakdo customer ki Order Slip (req) 

aur yeh pakdo Khaali Thali (res). Ab jaldi se is thali mein khana daal kar bhejo!"


*/