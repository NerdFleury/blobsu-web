import Link from "next/link";
import { MenuDivider, MenuItem } from "@mantine/core";
import { auth } from "@/auth";

export function MobileProfile() {
  const session: any = async () => {
    const data = await auth();
    return data;
  };
  // replace with logic to get user profile picture if one exists and link to profile page
  return (
    <>
      {session?.user ? (
        <MenuItem hiddenFrom="xs">Logged In (under construction)</MenuItem>
      ) : (
        <>
          <MenuDivider hiddenFrom="xs" />
          <MenuItem hiddenFrom="xs" component={Link} href="/login">
            Log in
          </MenuItem>
          <MenuItem hiddenFrom="xs" component={Link} href="/create">
            Sign Up
          </MenuItem>
        </>
      )}
    </>
  );
}
