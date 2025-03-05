import express from "express";
import Product from "../models/products.model.js";

const productsDBRouter = express.Router();

//using MongoDB
productsDBRouter.get("/", async (req, res)=>{
    try {
        const products = await Product.find().lean();
        res.status(200).render("product", {products: products, title: "Products"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retrieving product data."})
    }
});

productsDBRouter.post("/", async(req, res)=>{
    try {
        const { title, description, code, price, status, stock, category, image} = req.body;
        if(!title || !code || !price) return res.status(400).send({status: "error", message: "Please, complete all the required fields."})
        const response = await Product.insertOne({title, description, code, price, status, stock, category, image});
        res.status(201).render("product", {product: response, title: "Product"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error adding new product."});
    }
});

productsDBRouter.put("/:pid", async(req,res)=>{
    try {
        const { pid } = req.params;
        const productUpdates = req.body;

        const response = await Product.updateOne({_id: pid}, productUpdates);
        res.status(200).render("editProduct", {product: response, title: "Product"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error updating the product."})
    }
});

productsDBRouter.delete("/:pid", async(req,res)=>{
    try {
        const { pid } = req.params;

        const response = await Product.deleteOne({_id: pid});

        res.status(200).send({status:"success", payload: response})
    } catch (error) {
        res.status(500).send({status:"error", message: "Error deleting the product."})
    }
});
export default productsDBRouter;
