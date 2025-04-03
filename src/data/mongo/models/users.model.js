import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    birthday: { type: Date, required: true },
    email: { type: String, required: true, unique: true, index: true },
    avatar: {
      type: String,
      default: "https://ar.pinterest.com/pin/519110294568271513/", //Image from Pinterest
    },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "READONLY",
      enum: ["READONLY", "ADMIN", "PREMIUM"],
      idnex: true,
    },
  },
  { timestamps: true } //To handle creation Date
);

const User = mongoose.model("User", userSchema);

export default User;
