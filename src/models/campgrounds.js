import mongoose, { Schema } from "mongoose";
import { User } from "./users";
import { Review } from "./reviews";

const CampgroundsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export const Campground =
  mongoose.models.Campground || mongoose.model("Campground", CampgroundsSchema);
