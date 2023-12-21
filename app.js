import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import doubtRouter from "./routes/doubt.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

config({
    path:"./data/config.env"
})


//using middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/doubt",doubtRouter);


app.get("/",(req,res)=>{
    res.send("working");
})

app.use(errorMiddleware);





