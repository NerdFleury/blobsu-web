import { useEffect, useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BlobsuLogo from "@/public/headerlogo.png";
import classes from "@/app/components/styles/Headers.module.css";
import Image from "next/image";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/leaderboard", label: "Leaderboard" },
  { link: "/", label: "Top Plays" },
  { link: "/", label: "Rules" },
];

export default function Header({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false);

  const [icon, setIcon] = useState<any | null>();

  useEffect(() => {
    setIcon(children);
  }, [children]);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Image src={BlobsuLogo} width={60} height={60} alt="logo" />
        <Group align="center" gap={5} visibleFrom="xs">
          {items}
        </Group>
        {icon}

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
