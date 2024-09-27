"use server";

import { connectDB } from "@/libs/db";
import { Campground } from "@/models/campground";
import { redirect } from "next/navigation";

export async function newCampground(prevState, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const location = formData.get("location");

  try {
    await connectDB();
    await Campground.create({
      title,
      description,
      price,
      location,
    });
  } catch (error) {
    return { _form: "Submission failed. Try again!" };
  }
  redirect("/campgrounds");
}
