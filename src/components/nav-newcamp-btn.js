"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function AddCampgroundsBtn() {
  const path = usePathname();
  const session = useSession();

  if (session.data?.user && path !== "/new")
    return (
      <Link href="/new">
        <Button color="primary">Add</Button>
      </Link>
    );

  return null;
}
