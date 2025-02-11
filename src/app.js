import express from "express";
import { engine } from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();

const PORT = 8080;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set("views", "./src/views")

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});
