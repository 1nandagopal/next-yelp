"use server";

import { signIn } from "@/libs/auth";

export async function providerSignUp(provider) {
  console.log(provider);

  if (provider === "github")
    await signIn(provider, { redirectTo: "/campgrounds" });
}
