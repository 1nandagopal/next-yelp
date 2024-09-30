import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  emailVerified: Date,
  image: String,
});

export const User = mongoose.models.user || mongoose.model("User", UserSchema);
