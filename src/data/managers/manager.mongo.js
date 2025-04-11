import Product from "../models/products.model.js";
import User from "../models/users.model.js";

//Shared functions on all models
class Manager {
  constructor(model) {
    this.model = model;
  }
  createOne = async (data) => await this.model.create(data);
  readAll = async (filter) => await this.model.find(filter).lean();
  readBy = async (data) => await this.model.findOne(data).lean();
  readById = async (id) => await this.model.findOne({ _id: id }).lean();
  updateById = async (id, data) =>
    await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
  destroyByID = async (id) => await this.model.findOneAndDelete({ _id: id });
}

export default Manager;

const productsManager = new Manager(Product);
const userManager = new Manager(User);

export { productsManager, userManager };
