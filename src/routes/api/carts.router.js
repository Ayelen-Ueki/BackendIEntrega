import CustomRouter from "../custom.router.js";
import { cartsManager } from "../../data/managers/carts.mongo.js";

const addProductToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user._id;
  const one = await cartsManager.addProductToCart(
    product_id,
    quantity,
    user_id
  );
  res.json201(one);
};

const readProductsFromUser = async (req, res) => {
  const user_id = req.user._id;
  const all = await cartsManager.readProductsFromUser(user_id);
  if (all.length === 0) {
    res.json404();
  }
  res.json200(all);
};

const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const one = await cartsManager.updateQuantity(id, quantity);
  if (!one) {
    res.json404();
  }
  res.json200(one);
};

const updateState = async (req, res) => {
  const { id, state } = req.params;
  const states = ["reserved", "paid", "delivered"];
  if (state.includes(state)) {
    const one = await cartsManager.updateState(id, state);
    if (one) {
      return res.json200(one);
    }
    res.json404("Invalid State.");
  }
};

const removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  const one = await cartsManager.removeProductFromCart(id);
  if (!one) {
    res.json404();
  }
  res.json200(one);
};

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], addProductToCart);
    this.read("/", ["USER"], readProductsFromUser);
    this.update("/:id", ["USER"], updateQuantity);
    this.update("/:id/:state", ["USER"], updateState);
    this.destroy("/:id", ["USER"], removeProductFromCart);
    this.router.param("id", (req, res, next, id) => {
      try {
        if (!Types.ObjectId.isValid(id)) {
          const error = new Error("Invalid ID");
          error.statusCode = 400;
          throw error;
        }
      } catch (error) {
        next(error);
      }
    });
  };
}

let cartsRouter = new CartsRouter();
cartsRouter = cartsRouter.getRouter();
export default cartsRouter;
