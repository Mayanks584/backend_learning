/*

ye hmare khud ka middleware hai verfiy karega ki user login hia y anahi 


*/

import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asysnchandler.js";
import jwt from "jsonwebtoken"


import User from "../models/user.model.js"
export const verfiyJWT = asyncHandler(async(req,res,next) => {
    // ? kya use or re.header se sari line
  

  try {
      const token =  req.cookies?.acesstoken || req.header("Authorization")?.replace("Bearer ","")
     if(!token){
      throw new ApiError(401,"unauthorized request")
     }
  
  const decodedtoken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
  const user = await User.findById(decodedtoken?._id).select("-password -refreshToken")
  
  if(!user){
      throw new ApiError(401,"invalid acess token ")
  }
  
  req.user = user;
  
  next()
  } catch (error) {
    
    throw new ApiError(401,error?.message || "invalid acess token ")
    
  }


})