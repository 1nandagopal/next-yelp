import { auth } from "@/libs/auth";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Link from "next/link";

export async function NavAuth() {
  const session = await auth();
  if (!session?.user)
    return (
      <Link href="/auth?mode=signin">
        <Button color="primary">Log In</Button>
      </Link>
    );

  return (
    <div>
      <Popover backdrop="opaque">
        <PopoverTrigger>
          <Avatar
            src={session?.user.image}
            name={session?.user.name.at(0)}
          ></Avatar>
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <div className="flex flex-col w-full gap-1">
            <Link href="/mycampgrounds">
              <Button radius="md" fullWidth>
                My Campgrounds
              </Button>
            </Link>
            <form>
              <Button radius="md" color="danger" fullWidth>
                Log out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
