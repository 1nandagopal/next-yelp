import mongoose from "mongoose";

export async function connectDB() {
  console.log(mongoose.connection.readyState);

  if (mongoose.connection.readyState) return true;

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected!");
    return true;
  } catch (err) {
    console.log("db connection failed!");
  }
}
