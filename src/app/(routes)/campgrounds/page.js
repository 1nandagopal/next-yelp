import { getAllCampgrounds } from "@/actions/campgrounds";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

export default async function AllCampgroundsPage() {
  const campgrounds = await getAllCampgrounds();

  return (
    <div className="flex flex-wrap gap-4">
      {campgrounds.map((campground) => (
        <Card className="max-w-[350px] p-1" key={campground.id}>
          <CardHeader>
            <div className="flex justify-between items-center text-lg font-semibold w-full">
              <h3>{campground.title}</h3>
              <p>${campground.price}</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 p-0 px-3">
            <Image
              src={campground.images[0]}
              width={300}
              height={250}
              className="object-cover"
            />
            <p>📌 {campground.location}</p>
          </CardBody>
          <CardFooter className="text-gray-500 text-sm">
            By {campground.author.name}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
