import express from "express";
import Cart from "../models/carts.model";
import productsRouter from "./products.router";

const cartsDBRouter = express.Router;

cartsDBRouter.get("/", async (req, res)=>{
    try {
        const carts = await Cart.find().lean();
        res.status(200).render("cart", {carts: carts, title: "Carts"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retrieving cart data."})
    }
});

//To create a new empty cart
cartsDBRouter.post("/", async(req, res)=>{
    try {
        const newCart = { 
            products: [], 
        };
        const response = await Cart.insertOne(newCart);
        res.status(201).render("cart", {carts: response, title: "Carts"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error adding new cart."});
    }
});

//Get cart products by cart id
cartsDBRouter.get("/cid",async(req,res)=>{
    const cid = req.params.cid;
    try {
        const response = Cart.findById(cid);
        res.status(200).render("cart", {carts: response, title: "Cart"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retriving cart."});
    }
})

//To add products to a cart
cartsDBRouter.post("/:cid/products/:pid",async (req,res)=>{
    const {cid, pid} = req.params;
    try {
        const response = await Cart.findByIdAndUpdate(
            cid,
            {$push: {products: {product: pid}}},
            {new: true}    
        )
        const cartProduct = await Cart.find();
    } catch (error) {
        res.status(500).send({status: "error", message: "Error adding new products to the cart."});
    }

})

