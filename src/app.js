import express from "express";
import cartsRouter from "./routes/CartsManager.js";
import productsRouter from "./routes/ProductManager.js";

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set("views", "./src/views")

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.listen(8080, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
})
