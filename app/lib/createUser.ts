"use server";

import { permanentRedirect, redirect } from "next/navigation";

//why is next js like this

export async function handleSubmit(user: URLSearchParams) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_OSU_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: user.toString(),
    }).then((res) => {
      return res;
    });
    const confirm = await response.json();
    return confirm;
  } catch (error) {
    console.error(error);
  }
}
