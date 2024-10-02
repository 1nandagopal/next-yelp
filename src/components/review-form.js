import { Button, Textarea } from "@nextui-org/react";
import { SelectInput } from "./select-input";

export function ReviewForm() {
  return (
    <form action="" className="space-y-2">
      <div className="flex gap-2">
        <Textarea name="review" placeholder="Give your review" />
        <div className="flex flex-col gap-2.5 justify-end items-center w-20">
          <p className="text-foreground-500 text-sm">Rate</p>
          <SelectInput items={[1, 2, 3, 4, 5]} name="rating" placeholder="⭐" />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
