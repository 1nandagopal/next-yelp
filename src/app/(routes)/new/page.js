import { NewCampgroundForm } from "./new-campground-form";

export default function NewCampground() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-10">Create new campground</h2>
      <NewCampgroundForm />
    </div>
  );
}
