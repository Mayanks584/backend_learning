// how we create routes and export it pad lena uisko


import { Router } from "express";
import { loginUser, logoutUser, register } from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js"

import { verfiyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

// middleware injected 

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    register
)

// login route baad mein add karenge jab login controller banega



router.route("/login").post(loginUser)

// sercured routes

router.route("/logout").post(verfiyJWT,logoutUser)

export default router

