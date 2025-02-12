import express from "express";
import uploader from "../utils/uploader.js";
import crypto from "crypto";
import ProductsManager from "../productsManager.js";


const productsRouter = express.Router();

//Show products
productsRouter.get("/", async (req, res)=>{
    await ProductsManager.initialize();
    res.render("products",{products: ProductsManager.products, title: "Products list"});
})

//Add new product
productsRouter.get("/AddProduct", (req, res)=>{
    res.render("addProduct",{ title: "Add Product"});
})

productsRouter.post("/", uploader.array("prodImg"), async (req,res)=>{
    await ProductsManager.initialize();
    const id = crypto.randomUUID();
    
    if(!req.file) return res.status(400).send({message: "Error al recuperar la imagen."});

    const{title, description, code, price, status, stock, cathegory} = req.body;

    const imgPath ="/img/" + req.file.filename;

    //Es mejor manejar los campos requeridos desde aca o solo en el formulario con "required"?
    if(!title, !code, !price,!stock){
        res.status(400).send({error:"Error al recuperar los datos del producto."});
    }
    
    ProductsManager.products.push({id,title, description,code, price, status, stock, cathegory, thumbnail:{imgPath}});
    await ProductsManager.saveProducts(ProductsManager.products);
    res.render("products", {products: ProductsManager.products, title: "Products List"});
})

//Show product by id
productsRouter.get("/:pid", async(req, res)=>{
    await ProductsManager.initialize();
    const pid = req.params.pid;
    const product = ProductsManager.products.find(p=>p.id ===pid);

    if(!product){
        return res.status(404).send({error: "Producto no encontrado"});
    }
    res.render("product", {product: product, title: "Product"});
})

//Edit product
productsRouter.get("/:pid/edit",async (req,res)=>{
    await ProductsManager.initialize();
    const pid = req.params.pid;
    const product = ProductsManager.products.find(p=>p.id ===pid);

    if(!product){
        return res.status(404).send({error: "Producto no encontrado"});
    }
    res.render("editProduct", {product: product, title: "Edit product"});
})

productsRouter.put("/:pid", async(req,res)=>{
    await ProductsManager.initialize();
    const pid = req.params.pid;
    const prodIndex = ProductsManager.products.findIndex(p => p.id === pid);
    if (prodIndex === -1) {
        return res.status(404).send({ error: "Producto no encontrado" });
    }
    const{title, description, code, price, status, stock, cathegory} = req.body;
    
    ProductsManager.products[prodIndex] = {
        id: ProductsManager.products[prodIndex].id,
        title,
        description,
        code,
        price,
        status,
        stock,
        cathegory
    };

    await ProductsManager.saveProducts(ProductsManager.products);

    res.redirect("products");
})

//Delete products
productsRouter.delete("/:pid", async(req,res)=>{
    await ProductsManager.initialize();
    const pid = req.params.pid;
    const prodIndex = ProductsManager.products.findIndex(p => p.id === pid);

    if (prodIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    ProductsManager.products.splice(prodIndex,1);
    await ProductsManager.saveProducts(ProductsManager.products);

    res.redirect("products");
})



export default productsRouter;