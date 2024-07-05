import { IconUserCircle } from "@tabler/icons-react";
import defaultImg from "@/public/default.png";
import Link from "next/link";
import Image from "next/image";
import { UnstyledButton, Tooltip, Text } from "@mantine/core";
import { getSession } from "@/app/lib/getSession";

export async function MiniProfile() {
  const session = await getSession();
  // replace with logic to get user profile picture if one exists and link to profile page
  return (
    <>
      {session?.user ? (
        <Image
          src={defaultImg}
          width="50"
          height="50"
          alt="default pfp"
          style={{ borderRadius: 90 }}
        />
      ) : (
        <Tooltip
          position="left"
          opened
          label="Sign Up/Login"
          color="#04505c"
          withArrow
        >
          <UnstyledButton component={Link} href="/login">
            <IconUserCircle fill="white" width="50" height="50" />
          </UnstyledButton>
        </Tooltip>
      )}
    </>
  );
}
