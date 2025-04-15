import CustomRouter from "./custom.router.js";
import {
  productsManager,
  userManager,
} from "../data/managers/manager.mongo.js";
import { cartsManager } from "../data/managers/carts.mongo.js";

//Handles handlebars views to display
const homeView = async (req, res) => {
  try {
    res.status(200).render("home");
  } catch (error) {
    res.status(500).render("error");
  }
};

const productsView = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    return res.status(200).render("products", { products, title: "PRODUCTS" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
};

const profileView = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await userManager.readById(user_id);
    return res.status(200).render("profile", { profile, title: "PROFILE" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
};

const detailsView = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productsManager.readById(product_id);
    return res
      .status(200)
      .render("product", { product, title: product.title.toUpperCase() });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
};

const cartView = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await cartsManager.readProductsFromUser(user_id);
    return res.status(200).render("cart", { cart, title: "CART" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
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

class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/", homeView);
    this.use("/products", productsView);
    this.use("/products/:product_id", detailsView);
    this.use("/profile/:user_id", profileView);
    this.use("/cart/:user_id", cartView);
    this.use("/register", registerView);
    this.use("/login", loginView);
  };
}

const viewsRouter = new ViewsRouter();

export default viewsRouter;
