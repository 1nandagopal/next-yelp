import { NewCampgroundForm } from "@/components/new/new-form";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function NewCampgroundPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth");

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="my-4 text-2xl font-medium">New campground</h2>
      <NewCampgroundForm />
    </div>
  );
}
