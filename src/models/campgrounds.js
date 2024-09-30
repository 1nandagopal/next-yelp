import mongoose from "mongoose";

const CampgroundsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  images: [String],
});

export const Campground =
  mongoose.models.Campground || mongoose.model("Campground", CampgroundsSchema);
