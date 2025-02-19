import mongoose from "mongoose";

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        } catch (error) {
        console.log("Error with MongoDB connection.")
    }
}