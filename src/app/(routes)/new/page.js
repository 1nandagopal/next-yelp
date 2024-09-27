import Link from "next/link";
import { NewCampgroundForm } from "./new-campground-form";

export default function NewCampground() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10 flex justify-between items-center">
        <h2 className="text-3xl">Create new campground</h2>
        <Link href="/campgrounds">Home</Link>
      </div>
      <NewCampgroundForm />
    </div>
  );
}
