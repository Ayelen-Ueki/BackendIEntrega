import fs from "fs";
import path from "path";
import __dirname from "./utils/dirname.js";

const productsFile = path.join(__dirname, "src", "data", "products.json");



class ProductsManager{
    static products = [];
    //Retrieve products from json file  
    static initialize = async() =>{
        try {
            // const productsList = await fs.promises.readFile(productsFile,"utf-8");
            // products = JSON.parse(productsList);
            const fileContent = await fs.promises.readFile(productsFile, "utf-8");
            if (fileContent.trim().length === 0) {
                ProductsManager.products = [];
            } else {
                ProductsManager.products = JSON.parse(fileContent);
            }
        } catch (error) {
            console.error(error);
        }
    }

    //To save products in json file
    static saveProducts = async(products)=>{
        try {
            
            await fs.promises.writeFile(productsFile,JSON.stringify(products),"utf-8");
            
        } catch (error) {
            
            console.error(error);   
        }
    }
}

export default ProductsManager;