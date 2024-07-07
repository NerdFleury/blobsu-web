"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { headers } from "next/headers";

const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(15, "Name cannot be more than 15 characters long")
  .refine(
    (value) => {
      const hasUnderscore = value.includes("_");
      const hasSpace = value.includes(" ");

      return !(hasUnderscore && hasSpace); // Ensure both are not present
    },
    {
      message: "Name can contain either a `_` or a ` `, but not both",
    }
  );

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
    name: nameSchema,
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
    name: user.get("user[username]"),
    email: user.get("user[user_email]"),
    password: user.get("user[password]"),
    confirmPassword: user.get("user[confirmPassword]"),
  });

  if (!validatedFields.success) {
    let error = "";
    for (let x = 0; x < JSON.parse(validatedFields.error.message).length; x++) {
      error += JSON.parse(validatedFields.error.message)[x].message + ".";
    }
    return {
      message: error,
    };
  }
  try {
    await fetch(`${process.env.NEXT_PUBLIC_OSU_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: user.get("searchParams"),
    }).then((res) => {
      if (res.status == 400) {
        throw new Error("Invalid Registration data, User already exists");
      }
    });
  } catch (error) {
    console.log(error);
    return {
      message: "User or Email already exists",
    };
  }

  return {
    message: "Success",
  };
}
