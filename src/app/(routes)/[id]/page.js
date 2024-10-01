import { getCampground } from "@/actions/campgrounds";
import { ImageCarousel } from "@/components/image-carousel";
import { ScrollShadow } from "@nextui-org/react";

export default async function CampgroundPage({ params }) {
  const campground = await getCampground(params.id);

  if (!campground) return;

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
      <ImageCarousel images={campground.images} />
      <div className="h-full col-span-2 flex flex-col space-y-2">
        <div className="flex justify-between items-center font-semibold">
          <h3 className="text-2xl">{campground.title}</h3>
          <p>${campground.price}/night</p>
        </div>
        <ScrollShadow className="pr-1 text-justify scrollbar-hide">
          {campground.description}
        </ScrollShadow>
        <p>{campground.location}</p>
        <p>By {campground.author.name}</p>
      </div>
      <div className="bg-gray-400 h-full flex justify-center items-center">
        Map place holder
      </div>
      <div className="bg-rose-400 h-full flex justify-center items-center">
        D
      </div>
    </div>
  );
}
