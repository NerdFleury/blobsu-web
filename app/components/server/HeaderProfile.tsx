import { IconUserCircle } from "@tabler/icons-react";
import defaultImg from "@/public/default.png";
import Link from "next/link";
import Image from "next/image";
import { UnstyledButton, Tooltip, Text } from "@mantine/core";
import { getSession } from "@/app/lib/getSession";
import { auth } from "@/auth";
import { Session } from "next-auth";

export function MiniProfile() {
  const session: any = async () => {
    const data = await auth();
    return data;
  };
  // replace with logic to get user profile picture if one exists and link to profile page
  return (
    <>
      {session?.user ? (
        <UnstyledButton visibleFrom="xs">
          <Image
            src={defaultImg}
            width="50"
            height="50"
            alt="default pfp"
            style={{ borderRadius: 90 }}
          />
        </UnstyledButton>
      ) : (
        <Tooltip
          position="left"
          visibleFrom="md"
          opened
          label="Sign Up/Login"
          color="#04505c"
          withArrow
        >
          <UnstyledButton visibleFrom="xs" component={Link} href="/login">
            <IconUserCircle fill="white" width="lg" height="50" />
          </UnstyledButton>
        </Tooltip>
      )}
    </>
  );
}
