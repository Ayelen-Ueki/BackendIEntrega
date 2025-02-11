import fs from "fs";

class CartsManager{

    static cart={};
    
    static carts=[];
    
    static products=[];
    
    static cartsFile = "../data/carts.json";

    //Retrieve products from json file
    static initialize = async() =>{
        try {
            const cartsList = await fs.promises.readFile(cartsFile,"utf-8");
            carts = JSON.parse(cartsList);
        } catch (error) {
            console.error(error);
        }
    }


    static initializeProds = async() =>{
        try {
            await fs.promises.writeFile(productsFile,JSON.stringify(products),"utf-8");
        } catch (error) {
            console.error(error);   
        }
    }
    
    static createCart = (cart) => {
            try {
                fs.promises.writeFile(productsFile,JSON.stringify(cart),"utf-8");
            } catch (error) {
                console.error(error);   
            }
    }
}

export default CartsManager;