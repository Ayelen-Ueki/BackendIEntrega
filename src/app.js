import express from "express";
import { engine } from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import path from 'path';
import __dirname from "./utils/dirname.js";
import Handlebars from "handlebars";


const app = express();

const PORT = 8080;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

// Register the ifEquals helper
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.set('views', path.join(__dirname, '/src/views'));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});
