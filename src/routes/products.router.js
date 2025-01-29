import express from "express";
import uploader from "../utils/uploader.js";
import { error } from "console";
import fs from "fs";

const productsRouter = express.Router();

const products = [];

const productsFile = "../utils/products.json";

productsRouter.get("/", (req, res)=>{
    res.status(200).send(products);
})

productsRouter.get("/:pid", (req, res)=>{
    const pid = req.params;
    const product = products.find(p=>p.pid ===pid);

    if(!product){
        return res.status(404).send({error: "Producto no encontrado"});
    }
    res.status(200).send(product);
})

productsRouter.post("/", uploader.single("prodImg"), (req,res)=>{
    initialize();
    
    if(!req.file) return res.status(400).send({message: "Error al recuperar la imagen."});

    const{title, description, code, price, status, stock, cathegory} = req.body;

    const imgPath ="/img/" + req.file.filename;

    //Es mejor manejar los campos requeridos desde aca o solo en el formulario con "required"?
    if(!title, !code, !price,!stock){
        res.status(400).send({error:"Error al recuperar los datos del producto."});
    }
    
    products.push({title, description,code, price, status, stock, cathegory, thumbnail:imgPath});
    saveProducts(products)
    res.status(201).send(products);
})

const initialize = async() =>{
    try {
        const productsList = await fs.promises.readFile(productsFile,"utf-8");
        products = JSON.parse(productsList);
    } catch (error) {
        console.error(error);
    }
}

const saveProducts = async(products)=>{
    try {
        await fs.promises.writeFile(productsFile,JSON.stringify(products),"utf-8");
    } catch (error) {
        console.error(error);   
    }
}

export default productsRouter;