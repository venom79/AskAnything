import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getProfile, login, logout, register } from "../controllers/user.js";

const router = express.Router();

// get request
router.get("/login",(req,res)=>{
    res.send("login");
})
router.get("/register",(req,res)=>{
    res.send("register");
})

router.get("/profile",isAuthenticated,getProfile)

router.get("/logout",logout)


// post request
router.post("/register",register)

router.post("/login",login)


export default router;