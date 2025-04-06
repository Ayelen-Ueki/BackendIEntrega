import { Router } from "express";
import {
  productsManager,
  userManager,
  cartsManager,
} from "../data/mongo/manager.mongo.js";
import isUser from "../middlewares/isUser.mid.js";

const viewsRouter = Router();

//Handles handlebars views to display
const homeView = async (req, res) => {
  try {
    res.status(200).render("home");
  } catch (error) {
    res.status(500).render("error");
  }
};

const registerView = async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(500).render("error");
  }
};

const loginView = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(500).render("error");
  }
};

const meView = (req, res) => {
  try {
    res.status(200).render("me");
  } catch (error) {
    res.status(500).render("Error");
  }
};

viewsRouter.get("/", homeView);
viewsRouter.get("/register", registerView);
viewsRouter.get("/login", loginView);
viewsRouter.get("/me", meView);

export default viewsRouter;
