import express from "express";

const cartsRouter = express.Router();

const cart={};

const carts=[];

const products=[];

const product= {}

const cartsFile = "../utils/carts.json";

//Create a new cart
cartsRouter.post("/", (req, res)=>{
    initialize();

    const id = crypto.randomUUID;

    cart.push({id:id, products:{}});

    createCart(cart);
})

//Get cart products by cart id
cartsRouter.get("/cid",(req,res)=>{
    initialize();

    const cid = req.params.cid;

    const cartProds = carts.find(c => c.id === cid );

    res.render("cart");

})

//Add products to a cart
cartsRouter.post("/:cid/products/:pid",(req,res)=>{
    const {cid, pid} = req.params;
    initialize();
    initializeProds();

    cart = carts.find(c => c.id === cid);
    product = product.find(p => p.id === pid);

    if(!cart){
        res.stat(404).send({message: "Cart not found"});
    }

    if(!product){
        res.status(404).send({message:"Product not found"});
    }

    const existingProduct = cart.products.find(p => p.id === pid);

    if(existingProduct){
        existingProduct.quantity +1;
    }else{
        cart.products.push({id:pid, quantity:1});
    }

    res.redirect("cart");
})

//Retrieve products from json file
const initialize = async() =>{
    try {
        const cartsList = await fs.promises.readFile(cartsFile,"utf-8");
        carts = JSON.parse(cartsList);
    } catch (error) {
        console.error(error);
    }
}

const initializeProds = async() =>{
    try {
        await fs.promises.writeFile(productsFile,JSON.stringify(products),"utf-8");
    } catch (error) {
        console.error(error);   
    }
}

const createCart = (cart) => {
        try {
            fs.promises.writeFile(productsFile,JSON.stringify(cart),"utf-8");
        } catch (error) {
            console.error(error);   
        }
}

export default cartsRouter;
