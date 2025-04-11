import CustomRouter from "./custom.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import authRouter from "./api/auth.router.js";
import { Types } from "mongoose";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/auth", authRouter);
    this.use("/products", productsRouter);
    this.use("/carts", cartsRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter;
