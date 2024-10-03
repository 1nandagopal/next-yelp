import { auth } from "@/libs/auth";
import { ImageCarousel } from "@/components/image-carousel";
import { ReviewForm } from "@/components/review-form";
import { ScrollShadow } from "@nextui-org/react";
import actions from "@/actions";

export default async function CampgroundPage({ params }) {
  const campground = await actions.getCampgroundWithReviews(params.id);
  if (!campground) return;

  const session = await auth();

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
      <div className="overflow-hidden rounded-lg">
        <ImageCarousel images={campground.images} />
      </div>
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
      <div className="h-full col-span-2">
        <>
          {session?.user ? (
            <ReviewForm campgroundId={params.id} />
          ) : (
            <div>Log In to add reviews</div>
          )}
        </>
        <div className="flex flex-col mt-4">
          <h3 className="text-xl">Reviews</h3>
          {campground.reviews.toReversed().map((review) => (
            <div key={review.id} className="border-b-1 py-4 m-0">
              <div className="flex justify-between items-centers">
                <p>{review.body}</p>
                <p>{review.rating} ⭐</p>
              </div>
              <p className="text-right text-xs italic text-foreground-00">
                By {review.author.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
