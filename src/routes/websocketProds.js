import express from "express";
import uploader from "../utils/uploader.js";

const websocketRouter = express.Router();

websocketRouter.get("/", async(req,res)=>{
    res.render("realTimeProducts");
})

export default websocketRouter;