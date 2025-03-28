import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        name: {type:String},
        birthday: {type: Date, required: true},
        email: { type:String, required: true, unique: true, index: true},
        password: {type: String, required: true},
        role: {type: String, default:"READONLY", enum:["READONLY","ADMIN","MASTER"], idnex: true}
    },
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;