import CustomRouter from "../custom.router.js";
import { productsManager } from "../../data/managers/manager.mongo.js";
import { Types } from "mongoose";

const createOne = async (req, res) => {
  const data = req.body;
  const one = await productsManager.createOne(data);
  res.json201(one);
};

const readAll = async (req, res) => {
  const filter = req.query;
  const all = await productsManager.readAll(filter);
  if (all.length === 0) {
    res.json404();
  }
  res.json200(all);
};

const readById = async (req, res) => {
  const { pid } = req.params;
  const one = await productsManager.readById(pid);
  if (!one) {
    res.json404();
  }
  res.json200(one);
};

const updateById = async (req, res) => {
  const { pid } = req.params;
  const one = await productsManager.updateById(pid);
  if (!one) {
    res.json404();
  }
  res.json200(one);
};

const destroyByID = async (req, res) => {
  const { pid } = req.params;
  const one = await productsManager.destroyByID(pid);
  if (!pid) {
    res.json404();
  }
  res.json200(one);
};

const pidParam = (req, res, next, pid) => {
  try {
    const isObjectId = Types.ObjectId.isValid(pid);
    if (isObjectId) return next();
    const error = new Error("Invalid ID");
    error.statusCode = 400;
    throw error;
  } catch (error) {
    next(error);
  }
};

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:pid", ["PUBLIC"], readById);
    this.update("/:pid", ["ADMIN"], updateById);
    this.destroy("/:pid", ["ADMIN"], destroyByID);
    this.router.param("pid", pidParam);
  };
}

let productsRouter = new ProductsRouter();
productsRouter = productsRouter.getRouter();
export default productsRouter;
