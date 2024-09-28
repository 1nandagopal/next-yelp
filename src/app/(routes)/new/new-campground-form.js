"use client";

import { Button, Input, Textarea, Image } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { newCampground } from "@/actions";
import { useState } from "react";

export function NewCampgroundForm() {
  const [error, formAction] = useFormState(newCampground, null);
  const [imageURLs, setImageURLs] = useState([]);

  function handleSelect(e) {
    const { files } = e.target;
    const urlArr = Array.from(files)
      .slice(0, Math.min(5, files.length))
      .map((file) => URL.createObjectURL(file));
    setImageURLs(urlArr);
  }

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-5">
        <Input
          type="text"
          name="title"
          label="Title"
          labelPlacement="outside"
          placeholder="Give a title for your campground"
          isRequired
        />
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Give a description for your campground"
          isRequired
        />
        <Input
          type="price"
          name="price"
          label="Price"
          labelPlacement="outside"
          placeholder="Price of your campground"
          isRequired
        />
        <Input
          type="text"
          name="location"
          label="Location"
          labelPlacement="outside"
          isRequired
          placeholder="Location of your campground"
        />
        <Input
          type="file"
          name="images"
          label="Images"
          accept="image/png, image/jpeg"
          onChange={handleSelect}
          multiple
          isRequired
          placeholder="Select upto 5 images(Max 2MB)"
        />
        {!!imageURLs.length && (
          <div className="flex flex-wrap gap-2">
            {imageURLs.map((image) => (
              <Image
                src={image}
                fill
                height={125}
                width={125}
                className="object-cover z-0"
                alt="camp images"
              />
            ))}
          </div>
        )}
        <Button type="submit" color="primary" className="w-40">
          Submit
        </Button>
      </div>
    </form>
  );
}
