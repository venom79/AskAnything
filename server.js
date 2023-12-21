import { app } from "./app.js";
import {Database} from "./data/database.js";

//connecting dataBase
Database();


// starting server
app.listen(process.env.PORT,()=>{
    console.log(`server started at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})