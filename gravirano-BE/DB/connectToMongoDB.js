import mongoose from "mongoose";

const connectToMongoDB = async () => {
    console.log(process.env.MONGO_DB_URI);
    
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connection to MongoDB successfull!");
    } catch (error) {
        console.log("Connection to MongoDB failed!");
    }
}

export default connectToMongoDB;