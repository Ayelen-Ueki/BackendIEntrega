import express from "express";

const websocketRouter = express.Router();

websocketRouter.get("/", async(req,res)=>{
    res.render("realTimeProducts");
})

export default websocketRouter;