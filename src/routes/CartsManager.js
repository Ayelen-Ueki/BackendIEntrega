import express from "express";

const cartsRouter = express.Router();

const carts=[];

cartsRouter.get("/", (req, res)=>{
    res.status(200).send(carts);
})

export default cartsRouter;
