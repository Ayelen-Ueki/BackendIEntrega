import express from "express";
import uploader from "../utils/uploader.js";
import path from "path";

const websocketRouter = express.Router();

websocketRouter.get("/", async(req,res)=>{
    res.render("realTimeProducts");
})

websocketRouter.post("/upload", uploader.single("prodImg"), async(req,res)=>{
    const imagePath = path.join('/img', req.file.filename);
    res.json({ path: imagePath }); 
})

export default websocketRouter;