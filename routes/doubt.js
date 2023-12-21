import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addComment, allDoubt, deleteDoubt, doubtsComments, myDoubt, newDoubt } from "../controllers/doubt.js";


const router = express.Router();

router.post("/new",isAuthenticated,newDoubt)

router.get("/allDoubts",isAuthenticated,allDoubt);

router.get("/my",isAuthenticated,myDoubt);

router
    .route("/comment/:id")
    .post(isAuthenticated,addComment)
    .get(isAuthenticated,doubtsComments)
    .delete(isAuthenticated,deleteDoubt);

export default router;