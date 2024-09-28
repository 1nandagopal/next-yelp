"use server";

import { cloudinary } from "@/libs/cloudinary";
import { connectDB } from "@/libs/db";
import { Campground } from "@/models/campground";

export async function newCampground(prevState, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const location = formData.get("location");
  const images = formData.getAll("images");

  try {
    images.slice(0, Math.min(5, images.length)).forEach(async (image) => {
      const buffer = new Uint8Array(await image.arrayBuffer());
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "next-yelp" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });
    });
  } catch (e) {
    console.log(e);
  }
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
