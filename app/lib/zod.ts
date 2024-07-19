import { object, string } from "zod";

export const signInSchema = object({
  name: string({ required_error: "Username is required" })
    .min(3, "Invalid username")
    .max(15, "Invalid username")
    .refine(
      (value) => {
        const hasUnderscore = value.includes("_");
        const hasSpace = value.includes(" ");

        return !(hasUnderscore && hasSpace);
      },
      {
        message: "Invalid username",
      }
    ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
