import express from "express";
import http from "http";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/api/views.router.js";
import productsDBRouter from "./src/routes/api/productsDB.router.js"
import cartsDBRouter from "./src/routes/api/cartsDB.router.js"
import path from 'path';
import __dirname from "./src/utils/dirname.js";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import connectMongoDB from "./src/helpers/dbConnect.helper.js";
import methodOverride from "method-override";



//Initialize environment variables
dotenv.config();


const app = express();
const server = http.createServer(app);

const PORT = 8080;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

app.use(methodOverride('_method'));

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

app.use("/", viewsRouter);

//MongoDB
app.use("/api/products", productsDBRouter);
app.use("/api/carts", cartsDBRouter);


app.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});