import express from "express";
import multer from "multer";
import Product from "../models/products.model.js";

const productsDBRouter = express.Router();

//MongoDB
productsDBRouter.get("/", async (req, res)=>{
    try {
        //Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const products = await Product.paginate({},{page, limit, lean: true});

        products.forEach(product=>{
            if(product.image){
                const base64Image = product.image.toString('base64');
                product.image = `data:image/jpeg;base64,${base64Image}`;
            };
        })
        
        res.status(200).render("products", { products, title:"Products"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retrieving product data."});
    }
});

//Add new product
productsDBRouter.get("/AddProduct", (req, res)=>{
    res.status(200).render("addProduct",{ title: "Add Product"});
})

const upload = multer();

productsDBRouter.post("/",upload.single("prodImg"), async(req, res)=>{
    try {
        const { title, description, code, price, status, stock, category} = req.body;
        if(!title || !code || !price) return res.status(400).send({status: "error", message: "Please, complete all the required fields."})
        
        const prodImg = req.file?req.file.buffer:null;

        const response = await Product.insertOne({title, description, code, price, status, stock, category, image:prodImg});
        res.status(201).render("product", {product: response, title: "Product"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error adding new product."});
    }
});

//Show product by Id
productsDBRouter.get("/:pid", async(req, res)=>{
    const pid = req.params.pid;
    try {
        const product = await Product.findById(pid).lean();
        if(product.image){
            const base64Image = product.image.toString('base64');
            product.image = `data:image/jpeg;base64,${base64Image}`
        }
        if(!product){
            return res.status(404).send({error: "Product not found"});
        }
        res.status(200).render("product", {product: product, title: "Product"}); 
    } catch (error) {
        res.status(500).send({status:"error", message:"Error retrieving product"});
    }
})

//To edit product by Id

productsDBRouter.get("/edit/:pid", async (req, res)=>{
    const pid = req.params.pid;
    try {
        const product = await Product.findById(pid).lean();
        if(product.image){
            const base64Image = product.image.toString('base64');
            product.image = `data:image/jpeg;base64,${base64Image}`
        }
        if(!product){
            return res.status(404).send({error: "Product not found"});
        }
        res.status(200).render("editProduct", {product: product, title: "Product"}); 
    } catch (error) {
        res.status(500).send({status:"error", message:"Error retrieving product"});
    }
});


productsDBRouter.put("/:pid", upload.single("image"), async(req,res)=>{
    try {
        const { pid } = req.params;
        const productUpdates = req.body;

        if (req.file) {
            productUpdates.image = req.file.buffer;
        }

        const response = await Product.findByIdAndUpdate(pid, productUpdates,{ new: true, runValidators: true });
        if (!response) {
            return res.status(400).send({ status: "error", message: "Product not found."});
        }
        console.log("Updated product:", response);
        res.status(200).render("product", {product: response, title: "Product"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error updating the product."})
    }
});

//To delete product by Id
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
