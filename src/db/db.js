import mongoose from "mongoose";

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("Connected to MongoDB");
        } catch (error) {
        console.log("Error with MongoDB connection.")
    }
}

export default connectMongoDB;