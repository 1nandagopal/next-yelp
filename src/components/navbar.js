import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { NavAuth } from "./nav-auth";
import { AddCampgroundsBtn } from "./nav-newcamp-btn";

export default async function Nav() {
  return (
    <Navbar position="static" maxWidth="full" className="mb-5">
      <Link href="/campgrounds">
        <NavbarBrand>
          <p className="text-3xl font-semibold">Campgrounds</p>
        </NavbarBrand>
      </Link>
      <NavbarContent justify="end">
        <NavbarItem>
          <AddCampgroundsBtn />
        </NavbarItem>
        <NavbarItem>
          <NavAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
