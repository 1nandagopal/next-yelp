import { getCampground } from "@/actions/campgrounds";
import { ImageCarousel } from "@/components/image-carousel";

export default async function CampgroundPage({ params }) {
  const campground = await getCampground(params.id);
  console.log(campground);

  return (
    <div className="p-6 h-full">
      <div className="grid grid-cols-2 gap-4 h-full">
        <ImageCarousel images={campground.images} />
        <div>
          <div className="flex justify-between font-semibold">
            <h3 className="text-2xl">{campground.title}</h3>
            <p>${campground.price}/night</p>
          </div>
          <p>{campground.description}</p>
          <p>{campground.location}</p>
          <p>By {campground.author.name}</p>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
