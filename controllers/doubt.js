import ErrorHandler from "../middlewares/error.js";
import { Doubt } from "../models/doubt.js";

export const newDoubt = async(req,res,next)=>{
    try {
        let {doubt} = req.body;
        doubt = await Doubt.create({
            doubt,
            user:req.user,
        });
        res.status(201).json({
            doubt
        });
    } catch (error) {
        next(error);
    }
}

export const allDoubt = async(req,res,next)=>{
    try {
        const doubts = (await Doubt.find({})).reverse();
        if(doubts.length == 0) return next(new ErrorHandler("No Doubts Yet!",404))
        
        res.status(200).json({
            success:true,
            doubts
        });
    } catch (error) {
        next(error);
    }
}

export const myDoubt = async(req,res,next)=>{
    try {
        const user = req.user;
        const doubts = await Doubt.find({user});
        if(doubts.length == 0) return next(new ErrorHandler("You Have Not Posted Any Doubts Yet!",404));
        doubts.reverse();
        res.status(200).json({
            success:true,
            doubts,
        })
    } catch (error) {
        next(error);
    }
}

export const addComment = async (req,res,next) => {
    try {
        const { id } = req.params; 
        let {comment} = req.body;
    
        if(comment.length == 0) return next(new ErrorHandler("Comment Cannot Be Empty",404));
    
        const doubt = await Doubt.findById(id);
    
        if(!doubt) return next(new ErrorHandler("Doubt Doesn't Exist!",404));
    
        comment = {
            name:req.user.name,
            comment,
        }
        const existingComment = doubt.answer;
        existingComment.push(comment);
        doubt.answer = existingComment;
        doubt.save()
        res.status(201).json({
            success:true,
            message:"Comment added successfully!",
        })
    } catch (error) {
        next(error);
    }
};


export const doubtsComments = async(req,res,next)=>{
    try {
        const { id } = req.params; 

        const doubt = await Doubt.findById(id);

        if(!doubt) return next(new ErrorHandler("Doubt Doesn't Exist!",404));

        const comments = doubt.answer;
        if(comments.length == 0) return res.status(404).json({
            success:false,
            message:"No Comments Yet!"
        })
        comments.reverse();
        res.status(200).json({
            success:true,
            comments,
        })
    } catch (error) {
        next(error);
    }
}

export const deleteDoubt = async(req,res,next)=>{
    try {
        const { id } = req.params;

        const doubt = await Doubt.findById(id);
    
        if(!doubt) return next(new ErrorHandler("Doubt Doesn't Exist!",404));
    
        const isAuthor = req.user._id.toString() === doubt.user.toString();
        if(!isAuthor) return next(new ErrorHandler("You Cannot Delete Other Peoples Doubts",401));
    
        await Doubt.deleteOne({_id:id});
        res.status(200).json({
            success:true,
            message:"Doubt deleted Successfully!"
        })
    } catch (error) {
        next(error);
    }
    
}