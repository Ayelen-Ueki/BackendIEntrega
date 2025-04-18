import CustomRouter from "./custom.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import authRouter from "./api/auth.router.js";

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

let apiRouter = new ApiRouter();
apiRouter = apiRouter.getRouter();
export default apiRouter;
