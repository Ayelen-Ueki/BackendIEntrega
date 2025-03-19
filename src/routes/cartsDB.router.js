import express from "express";
import Cart from "../models/carts.model.js";

const cartsDBRouter = express.Router();

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
cartsDBRouter.get("/:cid",async(req,res)=>{
    const cid = req.params.cid;
    try {
        const cart = await Cart.findById(cid).lean();
        console.log(cart);
        res.status(200).render("cartProds", {cart: cart, title: "Cart"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retriving cart."});
    }
})

//Update cart product array
cartsDBRouter.put("/:cid",async(req,res)=>{
    const cid = req.params.cid;

})

//To add products to selected cart
cartsDBRouter.put("/:cid",async (req,res)=>{
    const { cid } = req.params; 
    const { productId } = req.body; 

    console.log("Cart ID:", cid); 
    console.log("Product ID:", productId);

    try {
   
        const updatedCart = await Cart.findByIdAndUpdate(
            cid,
            { $push: { products: { product: productId } } }, 
            { new: true } 
        );

        if (!updatedCart) {
            return res.status(404).send({
                status: "error",
                message: `Cart with ID ${cid} not found.`,
            });
        }

        res.status(200).send({
            status: "success",
            message: "Product added to cart successfully!",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send({
            status: "error",
            message: "Error adding product to cart. Please try again.",
        });
    }
})

//Delete all products in selected cart
cartsDBRouter.delete("/:cid",async(req,res)=>{
    const cid = req.params.cid;
    try {
        const response = await Cart.findByIdAndUpdate(
            cid,
            {$set:{products:[]}},
            {new: true}
        );
        if(!response){
            return res.status(404).send({status:"error", message:"Cart not found."});
        };
        res.status(200).send({status:"success", message:`Cart with id${cid} was emptied.`, payload:response});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error emptying cart.", error: error.message});
    }
})

//To delete a product from selected cart
cartsDBRouter.delete("/:cid/products/:pid", async(req,res)=>{
    try {
        const {cid, pid} = req.params;

        const response = await Cart.findByIdAndUpdate(
            cid, 
            {$pull:{products:{_id:pid}}},
            {new:true}
        );
        if(!response){
            return res.status(404).send({status:"error", message: `Product with id ${pid} removed from cart ${cid}.`, message:"Cart or product not found."})
        }
        res.status(200).send({status:"success", payload: response})
    } catch (error) {
        res.status(500).send({status:"error", message: "Error deleting the product of the selected cart.", error: error.message})
    }
})

export default cartsDBRouter;

