import { Router } from "express";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

const router = Router();

//Handle the other 2 main routers
router.use("/", viewsRouter);
router.use("/api", apiRouter);

export default router;
