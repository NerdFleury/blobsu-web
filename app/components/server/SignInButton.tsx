import { signIn } from "next-auth/react";
import { Button } from "@mantine/core";

export async function SignIn() {
  return (
    <Button onClick={() => signIn()} type="submit">
      Sign in
    </Button>
  );
}
