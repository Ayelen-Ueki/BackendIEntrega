import express from "express";
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();

const products = [];

productsRouter.get("/", (req, res)=>{
    res.status(200).send(products);
})

productsRouter.get("/:pid", (req, res)=>{
    const pid = req.params;
    const product = products.find(p=>p.pid ===pid);

    if(!product){
        return res.status(404).send({message: "Producto no encontrado"});
    }
    res.status(200).send(product);
})

productsRouter.post("/", uploader.single("prodImg"), (req,res)=>{
    if(!req.file) return res.status(400).send({message: "Error al recuperar la imagen."});

    const{title, description, code, price, status, stock, cathegory} = req.body
})

export default productsRouter;