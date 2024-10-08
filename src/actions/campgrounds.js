"use server";

import { auth } from "@/libs/auth";
import { cloudinary } from "@/libs/cloudinary";
import { connectDB } from "@/libs/db";
import { Campground } from "@/models/campgrounds";
import { CampgroundSchema } from "@/models/validationSchemas";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function newCampground(prevState, formData) {
  const session = await auth();
  if (!session?.user) return;

  const images = formData.getAll("images");

  const { success, data, error } = CampgroundSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location"),
    images: images,
    author: session.user.id,
  });
  if (!success) return error.flatten().fieldErrors;
  if (!data) return;

  try {
    const imageIDs = await Promise.all(
      images.map(async (image) => {
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
        return uploadResponse.public_id;
      })
    );

    await connectDB();

    const { title, description, price, location, author } = data;
    await Campground.create({
      title,
      description,
      price,
      location,
      author,
      images: imageIDs,
    });
  } catch (err) {
    console.log(err);
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
    return await Campground.findById(id).populate("author");
  } catch (err) {
    console.log(err);
  }
}

export async function getCampgroundsByAuthor(authorId) {
  if (!mongoose.Types.ObjectId.isValid(authorId)) return null;

  try {
    await connectDB();
    return await Campground.find({
      author: authorId,
    });
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

export async function updateCampground(id, formData) {
  if (!mongoose.Types.ObjectId.isValid(id)) return;

  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const location = formData.get("location");
  const deleteImages = formData.getAll("deleteImages");

  try {
    await connectDB();
    const campground = await Campground.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
      },
      { new: true }
    );

    if (deleteImages.length) {
      await Promise.all(
        deleteImages.map(
          async (img) =>
            await cloudinary.uploader.destroy(img, { invalidate: true })
        )
      );
      deleteImages.forEach((img) => campground.images.pull(img));
      await campground.save();
    }
  } catch (err) {
    console.log(err);
  }

  redirect(`/${id}`);
}

export async function deleteCampground(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  try {
    await connectDB();
    const campground = await Campground.findByIdAndDelete(id);
    if (campground.images.length)
      await Promise.all(
        campground.images.map((img) =>
          cloudinary.uploader.destroy(img, { invalidate: true })
        )
      );
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/mycampgrounds");
}
