import express from "express";
import http from "http";
import {Server} from "socket.io";
import { engine } from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
//import indexRouter from "./routes/index.router.js";
import websocketRouter from "./routes/websocketProds.js";
import productsDBRouter from "./routes/productsDB.router.js"
import path from 'path';
import __dirname from "./utils/dirname.js";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import connectMongoDB from "./db/db.js";
import ProductsManager from "./productsManager.js";


//Initialize environment variables
dotenv.config();


const app = express();
const server = http.createServer(app);
//websocket
const io = new Server(server);

const PORT = 8080;
//const port = 8081;

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

app.use("/api/products", productsRouter);

app.use("/home", viewsRouter);

app.use("/api/carts", cartsRouter);

//Websocket endpoint
app.use("/realtimeproducts", websocketRouter);

//MongoDB
app.use("/products", productsDBRouter);




//Websocket config
io.on("connection", async(socket)=>{

    await ProductsManager.initialize();

    socket.emit("products list", ProductsManager.products);

    socket.on("new product",({newTitle, newDescription, newCode, newPrice, newStatus, newStock, newCategory, newImage})=>{
        const newProduct = {title: newTitle, description: newDescription, code: newCode, price: newPrice, status: newStatus, stock: newStock, category: newCategory, image: newImage}
        
        //Pusheamos los mensajes que se van enviando a un array de mensajes
        ProductsManager.products.push(newProduct);
        ProductsManager.saveProducts(ProductsManager.products);

        io.emit("broadcast new product", newProduct);
    })

})

// app.listen(port, ()=>{
//     console.log("Servidor iniciado en: http://localhost:8080");
// });

server.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});