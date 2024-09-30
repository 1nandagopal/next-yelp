"use client";

import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function AuthForm() {
  const mode = useSearchParams().get("mode");

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">
        {mode === "signup" ? "Sign Up" : "Sign In"}
      </h3>
      <div className="flex flex-col gap-4">
        <form>
          <div className="flex flex-col">
            <Input
              color="primary"
              type="email"
              label="Email"
              isRequired
              className="mb-4"
            />
            <Input
              className="mb-4"
              color="primary"
              type="password"
              label="Password"
              isRequired
            />
            <Input
              color="primary"
              type="password"
              label="Confirm Password"
              className={`transition-height overflow-hidden ${
                mode === "signup" ? "h-14 mb-4" : "h-0"
              }`}
              isRequired
            />
            <Button color="primary" isDisabled>
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="text-xs">
          {mode === "signup" ? (
            <p>
              Already got an account?{" "}
              <Link
                href="/auth?mode=signin"
                className="text-blue-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          ) : (
            <p>
              Dont have an account?{" "}
              <Link
                href={"/auth?mode=signup"}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
