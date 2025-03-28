import express from "express";

const authRouter = express.Router();

authRouter.get("/register",(req,res)=>{
    res.render("register");
})

export default authRouter;