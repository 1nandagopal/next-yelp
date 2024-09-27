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

export async function getAllCampgrounds() {
  try {
    await connectDB();
    const campgrounds = await Campground.find();
    return campgrounds;
  } catch (error) {
    console.log(error);
  }
}
