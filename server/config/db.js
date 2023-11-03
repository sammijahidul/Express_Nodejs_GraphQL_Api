import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb database`)
    } 
    catch (error) {
        console.error(`Error in Mongodb ${error}`);        
    }
};

export default connectDB;