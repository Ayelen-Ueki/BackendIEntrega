import express from "express";
import "dotenv/config.js"
import { engine } from "express-handlebars";
import MongoStore from "connect-mongo";
import router from "./src/routes/index.router.js"
import path from 'path';
import __dirname from "./src/utils/dirname.js";
import connectMongoDB from "./src/helpers/dbConnect.helper.js";
import methodOverride from "method-override";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const server = express();
const PORT = 8080;

const ready = () =>{
    console.log("Server ready on port" + PORT);
    connectMongoDB();
}

server.listen(PORT, ready);

//Handlebars config
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set('views', path.join(__dirname, '/src/views'));

//Middlewares
server.use(express.static("public"));
server.use(express.urlencoded({extended:true}));
server.use(express.json());

// Register the ifEquals helper
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);


