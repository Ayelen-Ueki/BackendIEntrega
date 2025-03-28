import {Router} from "express";
import userRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import authRouter from "./api/auth.router.js";

const apiRouter = Router ();

// Router handling
apiRouter.use(userRouter);
apiRouter.use(productsRouter);
apiRouter.use(cartsRouter);
apiRouter.use(authRouter);

export default apiRouter;