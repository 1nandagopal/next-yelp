"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function AddCampgroundsBtn() {
  const path = usePathname();

  if (path !== "/new")
    return (
      <Link href="/new">
        <Button color="primary">Add</Button>
      </Link>
    );

  return null;
}
