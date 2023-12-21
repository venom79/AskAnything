import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated =async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token)
        return res.status(404).send({
            success:false,
            message:"Login First",
        })
    
    const decoded = jwt.verify(token,"itsbeenalongday");

    req.user = await User.findById(decoded._id);
    next();
}