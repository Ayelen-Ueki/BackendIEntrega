import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product_id: { type: Types.ObjectId, ref: "products", required: true },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    quantity: { type: Number, default: 1 },
    status: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
      index: true,
    },
  },
  { timestamps: true }
);

cartSchema.pre(/^find/, function () {
  this.populate("user_id", "email avatar").populate(
    "product_id",
    "title price stock"
  );
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
