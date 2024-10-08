"use client";

import { useState } from "react";
import SubmitBtn from "../submit-btn";
import { useFormState } from "react-dom";
import { newCampground } from "@/actions";
import { Input, Textarea, Image } from "@nextui-org/react";

export function NewCampgroundForm() {
  const [errors, formAction] = useFormState(newCampground, {});
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
      <div className="flex flex-col gap-3 my-6">
        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
          <Input
            type="text"
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Give a title for your campground"
            isRequired
            isInvalid={!!errors?.title}
            errorMessage={errors?.title?.[0]}
          />
          <Input
            type="price"
            name="price"
            label="Price"
            labelPlacement="outside"
            placeholder="Price of your campground"
            isRequired
            isInvalid={!!errors?.price}
            errorMessage={errors?.price?.[0]}
          />
        </div>
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Give a description for your campground"
          isRequired
          isInvalid={!!errors?.description}
          errorMessage={errors?.description?.[0]}
        />
        <Input
          type="text"
          name="location"
          label="Location"
          labelPlacement="outside"
          isRequired
          placeholder="Location of your campground"
          isInvalid={!!errors?.location}
          errorMessage={errors?.location?.[0]}
        />
        <Input
          type="file"
          name="images"
          label="Images"
          accept="image/png, image/jpeg"
          onChange={handleSelect}
          multiple
          isRequired
          description="Upto 5 images (Max 2MB each)"
          isInvalid={!!errors?.images}
          errorMessage={errors?.images?.[0]}
        />
        {!!imageURLs.length && (
          <div className="flex flex-wrap gap-2">
            {imageURLs.map((image) => (
              <Image
                key={image}
                src={image}
                height={125}
                width={125}
                className="object-cover z-0"
                alt="camp images"
              />
            ))}
          </div>
        )}
        <SubmitBtn color="primary" className="w-40">
          Submit
        </SubmitBtn>
      </div>
    </form>
  );
}
