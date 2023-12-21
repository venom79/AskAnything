import mongoose from "mongoose";

const doubtSchema =  new mongoose.Schema({
    doubt:{
        type:String,
        required:true,
    },
    answer:{
        type:Array,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

export const Doubt = mongoose.model("doubt",doubtSchema);