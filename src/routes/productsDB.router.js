import express from "express";
import Product from "../models/products.model.js";

const productsDBRouter = express.Router();

//using MongoDB
productsDBRouter.get("/", async (req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).send({status: "success", payload: products});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retrieving product data."})
    }
})

productsDBRouter.post("/", async(req, res)=>{
    try {
        const { title, description, code, price, status, stock, category, image} = req.body;
        if(!title || !code || !price) return res.status(400).send({status: "error", message: "Please, complete all the required fields."})
        const response = await Product.insertOne({title, description, code, price, status, stock, category, image});
        res.status(201).send({status: "success", payload:response });
    } catch (error) {
        res.status(500).send({status: "error", message: "Error adding new product"});
    }
})

export default productsDBRouter;
