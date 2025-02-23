import express from "express";
import ProductsManager from "../productsManager.js";
import __dirname from "../utils/dirname.js";

const indexRouter = express.Router();

//Show products
indexRouter.get("/", async (req, res)=>{
    await ProductsManager.initialize();
    res.render("home",{products: ProductsManager.products, dir: __dirname,title: "Products list"});
})

export default indexRouter;