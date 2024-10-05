import actions from "@/actions";
import { auth } from "@/libs/auth";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default async function MyCampgroundsPage() {
  const session = await auth();
  if (!session?.user) return;

  const campgrounds = await actions.getCampgroundsByAuthor(session.user.id);

  return (
    <div>
      <h2 className="text-2xl">My Campgrounds</h2>
      <div className="my-6 grid grid-cols-3 gap-2">
        {campgrounds.map((campground) => (
          <Card key={campground.id} isPressable>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <h3>{campground.title}</h3>
              </div>
            </CardHeader>
            <CardBody>
              <Image
                src={`https://res.cloudinary.com/dr34dquqh/image/upload/w_500/q_auto/f_auto/v1727972503/${campground.images[0]}`}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
