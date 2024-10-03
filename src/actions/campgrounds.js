"use server";

import { auth } from "@/libs/auth";
import { cloudinary } from "@/libs/cloudinary";
import { connectDB } from "@/libs/db";
import { Campground } from "@/models/campgrounds";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function newCampground(prevState, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const location = formData.get("location");
  const images = formData.getAll("images");
  const session = await auth();

  if (!session?.user) return;

  try {
    const imageURLs = await Promise.all(
      images.slice(0, Math.min(5, images.length)).map(async (image) => {
        if (image.size === 0) throw new Error("Empty images");
        const buffer = new Uint8Array(await image.arrayBuffer());
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "next-yelp" }, (err, result) => {
              if (err) reject(err);
              resolve(result);
            })
            .end(buffer);
        });
        return uploadResponse.secure_url;
      })
    );
    await connectDB(imageURLs);
    let camp = await Campground.create({
      title,
      description,
      price,
      location,
      images: imageURLs,
      author: session.user.id,
    });

    console.log(camp);
  } catch (e) {
    console.log(e);
  }

  redirect("/campgrounds");
}

export async function getAllCampgrounds() {
  try {
    await connectDB();
    return await Campground.find()
      .select("-description")
      .populate("author", "name -_id");
  } catch (err) {
    console.log(err);
  }
}

export async function getCampground(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  try {
    await connectDB();
    const camp = await Campground.findById(id).populate("author", "name -_id");
    return camp;
  } catch (err) {
    console.log(err);
  }
}

export async function getCampgroundWithReviews(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  try {
    await connectDB();
    const camp = await Campground.findById(id)
      .populate("author", "name -_id")
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          select: "name -_id",
        },
      });
    return camp;
  } catch (err) {
    console.log(err);
  }
}
