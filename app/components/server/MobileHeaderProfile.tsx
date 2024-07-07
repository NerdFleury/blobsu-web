import Link from "next/link";
import { MenuDivider, MenuItem } from "@mantine/core";
import { auth } from "@/auth";

async function getSession() {
  const data = await auth();
  return data;
}

export async function MobileProfile() {
  const session = await getSession();
  // replace with logic to get user profile picture if one exists and link to profile page
  return (
    <>
      {session?.user ? (
        <MenuItem c="white" hiddenFrom="xs">
          Logged In (under construction)
        </MenuItem>
      ) : (
        <>
          <MenuDivider hiddenFrom="xs" />
          <MenuItem c="white" hiddenFrom="xs" component={Link} href="/login">
            Log in
          </MenuItem>
          <MenuItem c="white" hiddenFrom="xs" component={Link} href="/create">
            Sign Up
          </MenuItem>
        </>
      )}
    </>
  );
}
