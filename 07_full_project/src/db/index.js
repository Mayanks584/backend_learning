import mongoose  from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        // MONGOOSE RETURNS AN OBJECT
   const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log(`\n mongodb connected !! DB host : ${connectionInstance.connection.host}`)

    } catch(error){
        console.log("Errir: ", error);
        // this is  a method in node process , process.exit()

        process.exit(1);

    }
}

export default connectDB
