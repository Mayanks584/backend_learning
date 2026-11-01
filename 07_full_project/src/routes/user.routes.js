// how we create routes and export it pad lena uisko


import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(register)

// login route baad mein add karenge jab login controller banega





export default router

