import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();
//console.log(process.env.MONGO_ROOT_USER); // Should output the MongoDB username


const mongodbUri = `mongodb+srv://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const connectToDatabase = async () => {
    try {
        console.log("MongoDB: Establishing a database connection...");
        await mongoose.connect(mongodbUri, {
            authSource: 'admin'
        });
        console.log("MongoDB: Connection to database established.")
    } catch (err) {
        console.log("MongoDB: There was en issue establishing the connection.");
        console.error(err.message);
    }
};

export default connectToDatabase;