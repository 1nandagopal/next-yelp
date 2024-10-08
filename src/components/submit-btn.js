"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export default function SubmitBtn({ children, ...props }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} {...props}>
      {children}
    </Button>
  );
}
