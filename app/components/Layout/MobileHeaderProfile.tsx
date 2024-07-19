import Link from "next/link";
import { MenuDivider, MenuItem } from "@mantine/core";
import { auth } from "@/auth";

async function getSession() {
  const data = await auth();
  return data;
}

async function getUserId(user: any) {
  const response = await fetch(
    `https://api.blobsu.xyz/v1/get_player_info?scope=info&name=${user.name}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.player.info.id;
}

export async function MobileProfile() {
  const session = await getSession();
  let id = 0;
  if (session?.user) {
    id = await getUserId(session.user);
  }
  return (
    <>
      {session?.user ? (
        <>
          <MenuItem
            component={Link}
            href={`/user/${id.toString()}`}
            hiddenFrom="xs"
          >
            Profile
          </MenuItem>
          <MenuItem component={Link} href="/settings" hiddenFrom="xs">
            Settings
          </MenuItem>
        </>
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
