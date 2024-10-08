"use client";

import { useRef } from "react";
import actions from "@/actions";
import SubmitBtn from "@/components/submit-btn";
import { useFormState } from "react-dom";
import { Select, SelectItem, Textarea } from "@nextui-org/react";

export function ReviewForm({ campgroundId }) {
  const formRef = useRef(null);
  const [errors, action] = useFormState(
    actions.submitReview.bind(null, campgroundId),
    {}
  );

  const ratings = [1, 2, 3, 4, 5];

  async function handleAction(formData) {
    await action(formData);
    formRef.current.reset();
  }

  return (
    <form action={handleAction} className="" ref={formRef}>
      <div className="flex gap-2">
        <Textarea
          name="review"
          placeholder="Give your review"
          maxRows={3}
          isInvalid={!!errors?.body}
          errorMessage={errors?.body?.[0]}
        />
        <div className="flex flex-col gap-4 justify-start items-center w-20">
          <p className="text-foreground-500 text-sm">Rate</p>
          <Select
            items={ratings}
            name="rating"
            placeholder="⭐"
            aria-label="Select a rating"
            isInvalid={!!errors?.rating}
            errorMessage="Select"
          >
            {ratings.map((rating) => (
              <SelectItem key={rating} textValue={rating}>
                {rating}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <SubmitBtn>Submit</SubmitBtn>
    </form>
  );
}
