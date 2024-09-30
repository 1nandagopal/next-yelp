import { Avatar, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { NavAuth } from "./nav-auth";

export default function Nav() {
  return (
    <Navbar position="static" maxWidth="full" className="mb-5 px-2">
      <Link href="/campgrounds">
        <NavbarBrand>
          <p className="text-3xl font-semibold">Campgrounds</p>
        </NavbarBrand>
      </Link>
      <NavbarContent justify="end">
        <NavAuth />
      </NavbarContent>
    </Navbar>
  );
}
