import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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
    maxlength: 250,
    index: "text",
    default: "No description available",
  },
  category: {
    type: String,
    default: "Cake",
    enum: ["Cake", "Cookie", "Other"],
  },
  image: {
    type: Buffer,
    default:
      "https://i.pinimg.com/736x/88/58/7b/88587bfa78369686b3ff1f25315617bf.jpg", //Pinterest image
  },
  price: {
    type: Number,
    required: true,
  },
  stock: { type: Number },
  owner_id: { type: Types.ObjectId, ref: "users", index: true },
});

productSchema.plugin(paginate);

productSchema.pre(/^find/, function () {
  this.populate("owner_id", "email avatar");
});

const Product = mongoose.model("Product", productSchema);

export default Product;
