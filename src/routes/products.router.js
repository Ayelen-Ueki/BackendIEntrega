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
    
    if(!req.files || req.files.length === 0) {
        return res.status(400).send({message: "Error al recuperar la imagen."});
    }
    const{title, description, code, price, status, stock, category} = req.body;

    const imgPath ="/img/"+ req.files[0].filename;

    //Es mejor manejar los campos requeridos desde aca o solo en el formulario con "required"?
    if(!title, !code, !price,!stock){
        res.status(400).send({error:"Error al recuperar los datos del producto."});
    }
    
    ProductsManager.products.push({id,title, description,code, price, status, stock, category, thumbnail:{imgPath}});
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

productsRouter.post("/:pid",uploader.array("prodImg"), async(req,res)=>{
    await ProductsManager.initialize();
    const pid = req.params.pid;
    const prodIndex = ProductsManager.products.findIndex(p => p.id === pid);
    if (prodIndex === -1) {
        return res.status(404).send({ error: "Producto no encontrado" });
    }
    const { title, description, code, price, status, stock, category } = req.body;
    let product = ProductsManager.products[prodIndex];

    // Update only the fields that are provided
    if (title) product.title = title;
    if (description) product.description = description;
    if (code) product.code = code;
    if (price) product.price = price;
    if (status) product.status = status;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    // Update the thumbnail only if a new file is uploaded
    if (req.file) {
        product.thumbnail = { imgPath: req.file.path };
    }

    ProductsManager.products[prodIndex] = product;

    await ProductsManager.saveProducts(ProductsManager.products);
    res.json({ message: "Product edited successfully" });
})

//Delete products
productsRouter.delete("/:pid", async (req, res) => {
    await ProductsManager.initialize();
    const pid = req.params.pid;
    const prodIndex = ProductsManager.products.findIndex(p => p.id === pid);

    if (prodIndex === -1) {
        throw new Error("Producto no encontrado");
    }

    const product = ProductsManager.products[prodIndex];

    // Check if the product has an associated image and delete it
    if (product.thumbnail && product.thumbnail.imgPath) {
        await ProductsManager.deleteFile(product.thumbnail.imgPath);
    }

    ProductsManager.products.splice(prodIndex, 1);
    await ProductsManager.saveProducts(ProductsManager.products);

    try {
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



export default productsRouter;