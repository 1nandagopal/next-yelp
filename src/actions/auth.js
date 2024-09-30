"use server";

import { signIn, signOut } from "@/libs/auth";

export async function providerSignUp(provider) {
  if (provider === "github")
    await signIn(provider, { redirectTo: "/campgrounds" });
}

export async function signOutUser() {
  await signOut({
    redirectTo: "/campgrounds",
  });
}
