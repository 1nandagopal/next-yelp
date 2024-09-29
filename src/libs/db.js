import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState) return mongoose.connection.getClient();
  try {
    await mongoose.connect(process.env.DB_URI);
    return mongoose.connection.getClient();
  } catch (err) {
    console.log("db connection failed!");
  }
}
