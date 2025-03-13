import mongoose from "mongoose";
const connectDB = async () => {
  if (!process.env.DB_CONNECTION_SECRET) {
    throw new Error("Database connection string is missing in environment variables.");
  }
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

export default connectDB;