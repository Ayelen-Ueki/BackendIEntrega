import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.listen(8080, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
})
