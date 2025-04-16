import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import __dirname from "./src/utils/dirname.js";
import connectMongoDB from "./src/helpers/dbConnect.helper.js";
import router from "./src/routes/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import Handlebars from "handlebars";

const server = express();
const PORT = process.env.PORT || 8080;

const ready = () => {
  console.log("Server ready on port: " + PORT);
  connectMongoDB();
};
server.listen(PORT, ready);

//Handlebars config
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Middlewares
server.use(morgan("dev")); //To monitor incoming requests and responses
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })); //To read queries and params
server.use(express.json());
server.use(cookieParser(process.env.COOKIE_KEY));

// Register the ifEquals helper
Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

//Router settings
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
