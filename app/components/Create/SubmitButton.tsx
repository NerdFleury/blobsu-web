"use client";

import { Button } from "@mantine/core";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth mt="xl" type="submit" disabled={pending}>
      Create Account
    </Button>
  );
}
