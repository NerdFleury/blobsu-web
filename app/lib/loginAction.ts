"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(prevState: any, formData: FormData) {
  const login = new FormData();

  login.append("email", formData.get("email")!);
  login.append("password", formData.get("password")!);

  try {
    await signIn("credentials", login, { redicrectTo: "/" });
  } catch (error) {
    if (isRedirectError(error)) {
      return {
        message: "Success",
      };
    }
    return {
      message: "Email or Password is Incorrect",
    };
  }
}
