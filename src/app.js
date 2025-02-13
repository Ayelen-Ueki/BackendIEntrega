import express from "express";
import { engine } from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import path from 'path';
import hbsHelpers from "../public/js/helpers.js";
import __dirname from "./utils/dirname.js";


const app = express();

app.engine('handlebars', engine({
    helpers: hbsHelpers,  // Register the helpers
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

const PORT = 8080;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.set('views', path.join(__dirname, 'views'));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});
