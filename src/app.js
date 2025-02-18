import express from "express";
import http from "http";
import {Server} from "socket.io";
import { engine } from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import indexRouter from "./routes/index.router.js";
import websocketRouter from "./routes/websocketProds.js";
import path from 'path';
import __dirname from "./utils/dirname.js";
import Handlebars from "handlebars";


const app = express();
const server = http.createServer(app);
//websocket
const io = new Server(server);

const PORT = 8080;
const port = 8081;

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static("public"));

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

app.use("/products", indexRouter);

app.use("/api/carts", cartsRouter);

//Websocket endpoint
app.use("/realtimeproducts", websocketRouter);

const products =[];

//Websocket config
io.on("connection",(socket)=>{
    socket.emit("products list", products);

    socket.on("new product",(productData)=>{
        //Pusheamos los mensajes que se van enviando a un array de mensajes
        products.push(productData);

        io.emit("broadcast new product", productData);
    })

})

app.listen(PORT, ()=>{
    console.log("Servidor iniciado en: http://localhost:8080");
});

server.listen(port, ()=>{
    console.log("Servidor iniciado en: http://localhost:8081");
});