import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    avatar: {
      type: String,
      default: "https://ar.pinterest.com/pin/519110294568271513/", //Image from Pinterest
    },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
      index: true,
    },
  },
  { timestamps: true } //To handle creation Date
);

const User = model("User", userSchema);

export default User;
