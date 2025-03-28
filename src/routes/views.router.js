import {Router} from "express";
import { productsManager, userManager, cartsManager } from "../data/mongo/manager.mongo";

const viewsRouter = Router ();

//Handle handlebars views to display
const homeView = async (req, res) =>{
    try {
        const products = await productsManager.readAll();
    } catch (error) {
        
    }
}

export default viewsRouter;