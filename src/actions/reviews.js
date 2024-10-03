"use server";

import { auth } from "@/libs/auth";
import { Campground } from "@/models/campgrounds";
import { Review } from "@/models/reviews";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitReview(campgroundId, prevState, formData) {
  const session = await auth();
  if (!session?.user) return;

  if (!mongoose.Types.ObjectId.isValid(campgroundId)) return;

  try {
    const campground = await Campground.findById(campgroundId);
    if (!campground) return;

    const body = formData.get("review");
    const rating = formData.get("rating");

    const review = await Review.create({
      body,
      rating,
      author: session.user.id,
    });

    campground.reviews.push(review);
    await campground.save();
    console.log(campground);
  } catch (err) {
    console.log(err);
  }

  redirect(`/${campgroundId}`);
}
