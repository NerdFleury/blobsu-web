import {
  Container,
  Group,
  ActionIcon,
  rem,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import classes from "../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import discord from "@/public/discord-mark-white.png";
import github from "@/public/github-mark-white.png";

export default function Footer() {
  return (
    <Center bd={0} className={classes.footer} py={25}>
      <Group gap={30} align="center" className={classes.links}>
        <Link
          style={{ textDecoration: "none" }}
          href="https://discord.gg/jRgudBuKjW"
        >
          <Stack align="center">
            <Image src={discord} width={36} height={27} alt="discord" />
          </Stack>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://github.com/NerdFleury/blobsu-web"
        >
          <Stack align="center">
            <Image src={github} width={36} height={36} alt="discord" />
          </Stack>
        </Link>
      </Group>
    </Center>
  );
}
