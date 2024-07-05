import Image from "next/image";
import { Group, Text, Stack } from "@mantine/core";
import discord from "@/public/discord-mark-blue.png";
import Link from "next/link";

export default function Socials() {
  return (
    <Group mt={120}>
      <Link style={{ textDecoration: "none" }} href={process.env.DISCORD!}>
        <Stack align="center">
          <Image src={discord} width={61} height={46} alt="discord" />
          <Text fw={700} c="#5664f2">
            Discord
          </Text>
        </Stack>
      </Link>
    </Group>
  );
}
