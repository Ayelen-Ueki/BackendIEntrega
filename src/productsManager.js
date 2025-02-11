import fs from "fs";

const productsFile = "../data/products.json";


class ProductsManager{
    static products = [];
    //Retrieve products from json file
    static initialize = async() =>{
        try {
            const productsList = await fs.promises.readFile(productsFile,"utf-8");
            products = JSON.parse(productsList);
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