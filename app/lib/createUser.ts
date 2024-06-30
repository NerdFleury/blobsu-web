"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(15, "Password must be at most 15 characters long")
  .regex(
    /^(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,15}$/,
    "Password must contain at least one special character or number"
  );

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function handleSubmit(prevState: any, user: FormData) {
  const validatedFields = schema.safeParse({
    name: user.get("name"),
    email: user.get("email"),
    password: user.get("password"),
    confirmPassword: user.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    let error = "";
    for (let x = 0; x < JSON.parse(validatedFields.error.message).length; x++) {
      error += JSON.parse(validatedFields.error.message)[x].message + ".";
    }
    console.log(error);
    return {
      message: error,
    };
  }

  const userdata = new URLSearchParams();
  userdata.append("user[username]", user.get("name")!);
  userdata.append("user[user_email]", user.get("email")!);
  userdata.append("user[password]", user.get("password")!);
  userdata.append("check", "0");

  try {
    await fetch(`${process.env.NEXT_PUBLIC_OSU_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: userdata.toString(),
    }).then((res) => {
      if (res.status == 400) {
        throw new Error("Invalid Registration data, User already exists");
      }
    });
  } catch (error) {
    return {
      message: "User or Email already exists",
    };
  }

  redirect("/");
}
