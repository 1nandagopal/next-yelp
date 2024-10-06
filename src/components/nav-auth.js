"use client";

import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function NavAuth() {
  const session = useSession();

  if (session.status === "loading")
    return (
      <Skeleton className="rounded-2xl">
        <Avatar />
      </Skeleton>
    );

  if (session.data?.user)
    return (
      <div className="cursor-pointer">
        <Popover backdrop="opaque">
          <PopoverTrigger>
            <Avatar
              src={session.data?.user.image}
              name={session.data?.user.name.at(0)}
            ></Avatar>
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <div className="flex flex-col rounded-xl overflow-hidden">
              <Link href="/new">
                <Button radius="none" color="primary" variant="light">
                  Add campground
                </Button>
              </Link>
              <Link href="/mycampgrounds">
                <Button radius="none" variant="light">
                  My Campgrounds
                </Button>
              </Link>
              <Button onClick={() => signOut()} radius="none" color="danger">
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );

  return (
    <Link href="/auth?mode=signin">
      <Button color="primary">Log In</Button>
    </Link>
  );
}
