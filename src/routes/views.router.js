import CustomRouter from "./custom.router.js";
import {
  productsManager,
  userManager,
} from "../data/managers/manager.mongo.js";
import { cartsManager } from "../data/managers/carts.mongo.js";

//Handles handlebars views to display
const homeView = async (req, res) => {
  try {
    res.renderView("home", 200);
  } catch (error) {
    res.renderView("error", 500);
  }
};

const productsView = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.renderView("products", 200, { products, title: "PRODUCTS" });
  } catch (error) {
    res.renderView("error", 500);
  }
};

const profileView = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await userManager.readById(user_id);
    res.renderView("profile", 200, { profile, title: "PROFILE" });
  } catch (error) {
    res.renderView("error", 500);
  }
};

const detailsView = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productsManager.readById(product_id);
    res.renderView("product", 200, {
      product,
      title: product.title.toUpperCase(),
    });
  } catch (error) {
    res.renderView("error", 500);
  }
};

const cartView = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await cartsManager.readProductsFromUser(user_id);
    res.renderView("cart", 200, { cart, title: "CART" });
  } catch (error) {
    res.renderView("error", 500);
  }
};

const registerView = async (req, res) => {
  try {
    res.renderView("register", 200);
  } catch (error) {
    res.renderView("error", 500);
  }
};

const loginView = async (req, res) => {
  try {
    res.renderView("login", 200);
  } catch (error) {
    res.renderView("error", 500);
  }
};

class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC"], homeView);
    this.read("/products", ["PUBLIC"], productsView);
    this.read("/products/:product_id", ["PUBLIC"], detailsView);
    this.read("/profile/:user_id", ["USER", "ADMIN"], profileView);
    this.read("/cart/:user_id", ["USER", "ADMIN"], cartView);
    this.read("/register", ["PUBLIC"], registerView);
    this.read("/login", ["PUBLIC"], loginView);
  };
}

let viewsRouter = new ViewsRouter();
viewsRouter = viewsRouter.getRouter();
export default viewsRouter;
