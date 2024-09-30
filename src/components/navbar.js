import { Avatar, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";

export default function Nav() {
  return (
    <Navbar position="static" maxWidth="full" className="mb-5 px-2">
      <Link href="/campgrounds">
        <NavbarBrand>
          <p className="text-2xl font-semibold">Campgrounds</p>
        </NavbarBrand>
      </Link>
      <NavbarContent justify="end">
        <Avatar src="">Apple</Avatar>
      </NavbarContent>
    </Navbar>
  );
}
