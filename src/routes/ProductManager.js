import express from "express";
import uploader from "../utils/uploader.js";
import { error } from "console";
import fs from "fs";

const productsRouter = express.Router();

const products = [];

const productsFile = "../utils/products.json";

//Show products
productsRouter.get("/", (req, res)=>{
    initialize();
    res.render("products",{products, title: "Products list"})
})

//Add new product
productsRouter.get("/AddProduct", (req, res)=>{
    res.render("addProduct",{ title: "Add Product"})
})

productsRouter.post("/", uploader.array("prodImg"), (req,res)=>{
    initialize();

    const id = crypto.randomUUID;
    
    if(!req.file) return res.status(400).send({message: "Error al recuperar la imagen."});

    const{title, description, code, price, status, stock, cathegory} = req.body;

    const imgPath ="/img/" + req.file.filename;

    //Es mejor manejar los campos requeridos desde aca o solo en el formulario con "required"?
    if(!title, !code, !price,!stock){
        res.status(400).send({error:"Error al recuperar los datos del producto."});
    }
    
    products.push({id:id,title, description,code, price, status, stock, cathegory, thumbnail:{imgPath}});
    saveProducts(products)
    res.render("products", {title: "Product"});
})

//Show product by id
productsRouter.get("/:pid", (req, res)=>{
    initialize();
    const pid = req.params;
    const product = products.find(p=>p.id ===pid);

    if(!product){
        return res.status(404).send({error: "Producto no encontrado"});
    }
    res.render("products", {title: "Product"});
})

//Edit product
productsRouter.get("/:pid/edit",(req,res)=>{
    initialize();
    const pid = req.params.pid;
    const product = products.find(p=>p.id ===pid);

    if(!product){
        return res.status(404).send({error: "Producto no encontrado"});
    }
    res.render("editProduct", {title: "Edit product"}, product);
})

productsRouter.put("/:pid", (req,res)=>{
    initialize();
    const pid = req.params;
    const prodIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) {
        return res.status(404).send({ error: "Producto no encontrado" });
    }
    const{title, description, code, price, status, stock, cathegory} = req.body;
    
    products[prodIndex] = {
        title : title,
        description : description,
        code : code,
        price : price,
        status : status,
        stock : stock,
        cathegory : cathegory
    };

    res.redirect("/");
})

//Delete products

productsRouter.delete("/:pid", (req,res)=>{
    const pid = req.params
    const prodIndex = products.findIndex(p => p.id === pid);

    products.splice(prodIndex,1)[0];

    res.redirect("/");
})


//Retrieve products from json file
const initialize = async() =>{
    try {
        const productsList = await fs.promises.readFile(productsFile,"utf-8");
        products = JSON.parse(productsList);
    } catch (error) {
        console.error(error);
    }
}

//To save products in json file
const saveProducts = async(products)=>{
    try {
        await fs.promises.writeFile(productsFile,JSON.stringify(products),"utf-8");
    } catch (error) {
        console.error(error);   
    }
}

export default productsRouter;