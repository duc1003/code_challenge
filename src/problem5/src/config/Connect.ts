import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  if (!uri) throw new Error("MONGODB_URI is required.");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {} as mongoose.ConnectOptions);
  console.log("✅ MongoDB connected");
};
export default connectDB;
