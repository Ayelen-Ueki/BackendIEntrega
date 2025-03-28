import express from "express";
import multer from "multer";
import Product from "../../data/mongo/models/products.model.js";

const productsRouter = express.Router();

//MongoDB
productsRouter.get("/", async (req, res)=>{
    try {
        //Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 4;

        const category = req.query.category || null;
        const query = category ? { category } : {};
        const sort = req.query.sort === "price_asc" ? { price: 1 } : req.query.sort === "price_desc" ? { price: -1 } : {};

        const products = await Product.paginate(query,{page, limit, lean: true, sort: sort});

        products.docs.forEach(product=>{
            if(product.image){
                const base64Image = product.image.toString('base64');
                product.image = `data:image/jpeg;base64,${base64Image}`;
            };
        })
        
        res.status(200).render("products", { 
            products: products.docs,
            page: products.page,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            title:"Products",
            categories: ["Cakes", "Cookies", "Others"],
            selectedCategory: category || "All",
            selectedSort: req.query.sort,
        });
    } catch (error) {
        res.status(500).send({status: "error", message: "Error retrieving product data."});
    }
});

//Add new product
productsRouter.get("/AddProduct", (req, res)=>{
    res.status(200).render("addProduct",{ title: "Add Product"});
})

const upload = multer();

productsRouter.post("/", upload.single("prodImg"), async(req, res)=>{
    try {
        const { title, description, code, price, status, stock, category} = req.body;
        if(!title || !code || !price) return res.status(400).send({status: "error", message: "Please, complete all the required fields."})
        
        const prodImg = req.file?req.file.buffer:null;

        const response = await Product.insertOne({title, description, code, price, status, stock, category, image:prodImg});
        res.status(201).render("products", {products: response, title: "Products"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error adding new product."});
    }
});

//Show product by Id
productsRouter.get("/:pid", async(req, res)=>{
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

productsRouter.get("/edit/:pid", async (req, res)=>{
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



productsRouter.put("/:pid", upload.single("prodImg"), async(req,res)=>{
    try {
        const { pid } = req.params;
        const productUpdates = req.body;

        if (req.file) {
            productUpdates.image = req.file.buffer;
        }

        await Product.findByIdAndUpdate(pid, productUpdates,{ new: true, runValidators: true });

        const response = await Product.findById(pid).lean();
        
        if (!response) {
            return res.status(400).send({ status: "error", message: "Product not found."});
        }
        res.status(200).render("product", {product: response, title: "Product"});
    } catch (error) {
        res.status(500).send({status: "error", message: "Error updating the product."})
    }
});

//To delete product by Id
productsRouter.delete("/:pid", async(req,res)=>{
    try {
        const { pid } = req.params;

        const response = await Product.deleteOne({_id: pid});

        res.status(200).send({status:"success", payload: response})
    } catch (error) {
        res.status(500).send({status:"error", message: "Error deleting the product."})
    }
});

export default productsRouter;
