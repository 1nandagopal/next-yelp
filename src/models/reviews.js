import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Review =
  mongoose.models.Review || new mongoose.model("Review", ReviewSchema);
