"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { newCampground } from "@/actions/new-campground";

export function NewCampgroundForm() {
  const [error, formAction] = useFormState(newCampground, null);
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-5 ">
        <Input type="text" name="title" label="Title" isRequired />
        <Textarea label="Description" isRequired />
        <Input type="price" label="Price" isRequired />
        <Input type="text" label="Location" isRequired />
        <Button type="submit" color="primary" className="w-40">
          Submit
        </Button>
      </div>
    </form>
  );
}
