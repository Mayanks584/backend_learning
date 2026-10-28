/*

file mere pass ayegi file system ke through yahi ki server pe upload ho chuki 

server kya hai or isme uplad kya hui koi pta ni mujhe 

loacl file path (jo file mere server pe hai ) ->



server se ap mujhe loacal path doge usko cloudinary ko duga 

file upload hogi to usko local server se remove kar dege 


*/
// cloud is custom same 
import {v2 as cloud} from "cloudinary"

import fs from "fs"

// fs is file system in node 

// mean humko file ka path chiaye hota hai 

// unlink path -- use in node ki jab mere server pe upload ho jayegi to usko delete kar do 

// local server se without effect the code 


cloudinary.config({ 
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUNDINARY_API_KEY , 
  api_secret: process.env.CLOUNDINARY_API_SECRET
});



const uploadoncloudinary = async (localfilepath) =>{


    try {
            if(!localfilepath){
                return null;
            }
            // upload the file on cloudinary


       const response =  await   cloudinary.uploader.upload(localfilepath,{
                // learn the option in documentation 

                resource_type:"auto"
            })

            // file has been uplaod sucessfully 

            console.log("ho gyi uploadded on cloudinary ");

            console.log(response);


            // why we return response 

            return response;

    }
    catch(error){

        // see agar vo cloudinary pe upload nahi hui hai par vo apne server 
        // pe to hogi to usko bhi remove karna pdega

        // unlinksync lga ke  - reomve the loaclly saved tempory file as the upload operation fail

        fs.unlinkSync(localfilepath)

        return null;



    }
}



export {uploadoncloudinary}