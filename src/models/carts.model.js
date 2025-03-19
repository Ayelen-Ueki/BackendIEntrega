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


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;