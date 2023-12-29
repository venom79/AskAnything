import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { setCookie } from "../utils/features.js";
import bcrypt from "bcrypt"


export const register = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body;

        let user = await User.findOne({email});
        if(user) return next(new ErrorHandler("User Already Exist",409));
        const hashedPassword = await bcrypt.hash(password,10);
        req.user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        setCookie(req.user,res,"Registered Successfully!",201);
    } catch (error) {
        next(error);
    }
}


export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;

        let user = await User.findOne({email});
        if(!user) return next(new ErrorHandler("Invalid Email or Password!",400));
    
        const ismatch = await bcrypt.compare(password,user.password);
    
        if(!ismatch) return next(new ErrorHandler("Password Incorrect!",401));
    
        setCookie(user,res,`Welcome back ${user.name}`,201);
    } catch (error) {
        next(error);
    }
}

export const logout = (req,res)=>{
    res.status(201).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "development"?"lax":"none",
        secure:process.env.NODE_ENV === "development"?false:true,
    }).json({
        success:true,
        message:"logged out successfully"
    })
}

export const getProfile = (req,res,next)=>{
    const user = req.user;

    if(!user) return next(new ErrorHandler("Not Logged In",404));
    res.status(200).json({
        success:true,
        user,
    })
}