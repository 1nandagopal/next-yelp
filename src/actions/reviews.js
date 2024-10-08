"use server";

import { auth } from "@/libs/auth";
import { Campground } from "@/models/campgrounds";
import { Review } from "@/models/reviews";
import { ReviewSchema } from "@/models/validationSchemas";
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

    const { success, data, error } = ReviewSchema.safeParse({
      body: formData.get("review"),
      rating: formData.get("rating"),
      author: session?.user.id,
    });

    if (!success) return error.flatten().fieldErrors;
    if (!data) return;

    const review = await Review.create(data);
    campground.reviews.push(review);
    await campground.save();
  } catch (err) {
    console.log(err);
  }

  revalidatePath(`/${campgroundId}`);
  redirect(`/${campgroundId}`);
}
