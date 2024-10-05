import actions from "@/actions";
import { auth } from "@/libs/auth";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Link from "next/link";

export default async function MyCampgroundsPage() {
  const session = await auth();
  if (!session?.user) return;

  const campgrounds = await actions.getCampgroundsByAuthor(session.user.id);

  return (
    <div>
      <h2 className="text-2xl">My Campgrounds</h2>
      <div className="my-6 grid grid-cols-3 gap-2">
        {campgrounds.map((campground) => (
          <Card key={campground.id}>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <h3>{campground.title}</h3>
                <Popover radius="sm" placement="bottom">
                  <PopoverTrigger>
                    <Button isIconOnly>+</Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 overflow-hidden">
                    <Link href={`/${campground.id}`}>
                      <Button variant="light" radius="none">
                        Visit
                      </Button>
                    </Link>
                    <Link href={`/${campground.id}/edit`}>
                      <Button color="warning" variant="light" radius="none">
                        Edit
                      </Button>
                    </Link>
                    <Button color="danger" variant="light" radius="none">
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
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
