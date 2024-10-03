"use client";

import { Button, Textarea } from "@nextui-org/react";
import { SelectInput } from "./select-input";
import { useFormState } from "react-dom";
import actions from "@/actions";

export function ReviewForm({ campgroundId }) {
  const [error, action] = useFormState(
    actions.submitReview.bind(null, campgroundId),
    {}
  );

  return (
    <form action={action} className="space-y-2">
      <div className="flex gap-2">
        <Textarea name="review" placeholder="Give your review" />
        <div className="flex flex-col gap-2.5 justify-end items-center w-20">
          <p className="text-foreground-500 text-sm">Rate</p>
          <SelectInput
            items={[1, 2, 3, 4, 5]}
            name="rating"
            placeholder="⭐"
            aria-label="Select a rating"
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
