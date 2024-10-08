import { z } from "zod";

const ImageSchema = z.object({
  size: z
    .number()
    .positive("Image is required")
    .max(1024 * 1024 * 2, "Image must be less than 2MB each"),
  type: z.string().startsWith("image/", "Only images are allowed"),
});

export const CampgroundSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
    price: z
      .number({
        coerce: true,
        invalid_type_error: "Invalid price",
      })
      .positive("Invalid price")
      .safe(),
    description: z.string().trim().min(1, "Description is required"),
    location: z.string().trim().min(1, "Location is required"),
    images: z
      .array(ImageSchema)
      .min(1, "Image is required")
      .max(5, "Max 5 images"),
    author: z.string(),
  })
  .strict();
