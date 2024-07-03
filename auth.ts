import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./app/lib/zod";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        csrfToken: {},
      },
      authorize: async (credentials: any) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          const userdata = new URLSearchParams();
          userdata.append("user[pass]", password);
          userdata.append("user[email]", email);
          userdata.append("user[secret]", process.env.ACCESS_SECRET!);

          const data = await fetch(
            `${process.env.NEXT_PUBLIC_OSU_API}/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: userdata.toString(),
            }
          );

          if (data.status !== 200) {
            throw new Error("Incorrect email or password");
          }
          return credentials;
        } catch (error) {
          if (error instanceof ZodError) {
            console.log(error);
            return null;
          }
        }
      },
    }),
  ],
});
