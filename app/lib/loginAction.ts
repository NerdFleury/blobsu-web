"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(prevState: any, formData: FormData) {
  const login = new FormData();

  login.append("name", formData.get("user")!);
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
      message: "Username or Password is Incorrect or User doesnt exist",
    };
  }
}
