import mongoose  from "mongoose";
import dns from "node:dns";
import { DB_NAME } from "../constants.js";
//
 // Force Node to use reliable DNS servers (Google DNS) for SRV queries
// try {
//     dns.setServers(['8.8.8.8', '8.8.4.4']);
// } catch (e) {
//     // Ignore if restricted
// }

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
