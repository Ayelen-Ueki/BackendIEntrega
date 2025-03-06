import express from "express";
import http from "http";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsDBRouter from "./routes/productsDB.router.js"
import cartsDBRouter from "./routes/cartsDB.router.js"
import path from 'path';
import __dirname from "./utils/dirname.js";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import connectMongoDB from "./db/db.js";



//Initialize environment variables
dotenv.config();


const app = express();
const server = http.createServer(app);

const PORT = 8080;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

connectMongoDB();

//Handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, '/src/views'));

// Register the ifEquals helper
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

//endpoints

app.use("/home", viewsRouter);

//MongoDB
app.use("/products", productsDBRouter);
app.use("/carts", cartsDBRouter);


app.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});