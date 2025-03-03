import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    //Schema config object
    title: {
        type: String,
        unique: true,
        required: true, 
        //index: true
    },
    description: {
        type: String, 
        maxlength:250, 
        index: "text",
        default: "No description available"
    },
    code: {
        type: String, 
        unique: true,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    status: Boolean,
    stock: Number,
    category: String,
    image: {
        type:String,
        default: "/Users/mariaueki/Documents/Backend/BackendIEntrega/public/img/1740336410407-Test.jpg"
    }
})

productSchema.index({title: 1, code: 1});

const Product = mongoose.model("Product", productSchema);

export default Product;