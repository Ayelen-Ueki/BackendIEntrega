import express from "express";

const viewsRouter = express.Router();

viewsRouter.get("/", (req,res)=>{
    res.render("home", {bodyClass: "d-flex justify-content-center align-items-center vh-100"});
})

export default viewsRouter;