import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products : {
        type: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref:"Product"}
            }
        ],
        default: []
    }
})

//middleware.pre()

productSchema.pre("find", function(next){
    this.populate("products.product");
    next();
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;