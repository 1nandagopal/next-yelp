"use client";

import { signOutUser } from "@/actions/auth";
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
            <div className="flex flex-col w-full gap-1">
              <Button radius="md" isDisabled fullWidth>
                <Link href="/mycampgrounds">My Campgrounds</Link>
              </Button>
              <Button
                onClick={() => signOut()}
                radius="md"
                color="danger"
                fullWidth
              >
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
