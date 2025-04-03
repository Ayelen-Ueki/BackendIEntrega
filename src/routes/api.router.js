import { Router } from "express";
import userRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import authRouter from "./api/auth.router.js";

const apiRouter = Router();

// Router handling
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
