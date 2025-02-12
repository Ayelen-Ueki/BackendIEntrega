import express from "express";
import uploader from "../utils/uploader.js";
import crypto from "crypto";
import CartsManager from "../cartsManager.js";
import { title } from "process";

const cartsRouter = express.Router();

cartsRouter.get("/", async(req,res)=>{
    await CartsManager.initialize();
    res.render("carts",{carts: CartsManager.carts, title:"Carts"})
})

//Create a new cart and store it in carts
cartsRouter.post("/", async(req, res)=>{
    await CartsManager.initialize();
    const id = crypto.randomUUID();
    await CartsManager.cart.push({id:id, products:[]});
    CartsManager.carts.push(CartsManager.cart[id]);
    res.status(201).send({ message: "Cart created successfully" });
    res.render("carts",{carts: CartsManager.carts, title:"Carts"})
})

//Get cart products by cart id
cartsRouter.get("/cid",async(req,res)=>{
    await CartsManager.initialize();
    const cid = req.params.cid;
    const cart = CartsManager.carts.find(c => c.id === cid );
    if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
    }
    res.render("cartProds",{cart, title:"Cart Products"});
})

//Add products to a cart
cartsRouter.post("/:cid/products/:pid",async (req,res)=>{
    const {cid, pid} = req.params;
    await CartsManager.initialize();
    await CartsManager.initializeProds();

    const cart = CartsManager.carts.find(c => c.id === cid);
    const product = CartsManager.products.find(p => p.id === pid);

    if(!cart){
        res.stat(404).send({message: "Cart not found"});
    }

    if(!product){
        res.status(404).send({message:"Product not found"});
    }

    const existingProduct = cart.products.find(p => p.id === pid);

    if(existingProduct){
        existingProduct.quantity +1;
    }else{
        cart.products.push({id:pid, quantity:1});
    }   
    CartsManager.createCart(CartsManager.carts);
    res.redirect(`/cart/${cid}`);
})


export default cartsRouter;
