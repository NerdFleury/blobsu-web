import { IconUserCircle } from "@tabler/icons-react";
import defaultImg from "@/public/default.png";
import Link from "next/link";
import Image from "next/image";
import {
  UnstyledButton,
  Tooltip,
  Text,
  Button,
  Group,
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuItem,
} from "@mantine/core";
import { auth } from "@/auth";
import { Session } from "next-auth";

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

export async function MiniProfile() {
  const session = await getSession();
  let id = 0;
  if (session?.user) {
    id = await getUserId(session.user);
  }
  return (
    <>
      {session?.user ? (
        <Menu>
          <MenuTarget>
            <UnstyledButton mt="0.4em" visibleFrom="xs">
              <Image
                src={`https://a.blobsu.xyz/${id}`}
                width="46"
                height="46"
                alt="default pfp"
                style={{ borderRadius: 90 }}
              />
            </UnstyledButton>
          </MenuTarget>

          <MenuDropdown visibleFrom="xs" bg="#022429">
            <MenuItem component={Link} href={`/user/${id.toString()}`}>
              Profile
            </MenuItem>
            <MenuItem component={Link} href="/settings">
              Settings
            </MenuItem>
          </MenuDropdown>
        </Menu>
      ) : (
        <Group visibleFrom="xs">
          <Button size="xs" variant="filled" component={Link} href={"/create"}>
            Sign Up
          </Button>
          <Button
            size="xs"
            fw={400}
            variant="outline"
            component={Link}
            href={"/login"}
          >
            Log in
          </Button>
        </Group>
      )}
    </>
  );
}
