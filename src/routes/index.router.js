import express from "express";
import ProductsManager from "../productsManager.js";

const indexRouter = express.Router();

//Show products
productsRouter.get("/", async (req, res)=>{
    await ProductsManager.initialize();
    res.render("index",{products: ProductsManager.products, title: "Products list"});
})

export default indexRouter;