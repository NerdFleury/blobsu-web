"use client";

import { ReactElement, useEffect, useState } from "react";
import { Container, Group, Burger, Menu, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BlobsuLogo from "@/public/Logo.png";
import classes from "@/app/components/styles/Headers.module.css";
import Image from "next/image";
import Link from "next/link";

const links = [
  { link: "/leaderboard", label: "Leaderboard" },
  { link: "/topplays/0/1", label: "Top Plays" },
  { link: "/", label: "Rules" },
];

export function Header({ children }: { children: ReactElement }) {
  const [opened, { toggle }] = useDisclosure(false);

  const [icon, setIcon] = useState<any | null>();
  const [mobileLog, setMobileLog] = useState<any | null>();

  useEffect(() => {
    setIcon(children.props.children[0]);
    setMobileLog(children.props.children[1]);
  }, [children]);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <UnstyledButton component={Link} href="/" mt="0.5em" visibleFrom="xs">
          <Image src={BlobsuLogo} width={48} height={48} alt="logo" />
        </UnstyledButton>
        <Group ml={"10%"} justify="flex-end" gap={5} visibleFrom="xs">
          {items}
        </Group>
        {icon}
        <UnstyledButton
          component={Link}
          onClick={opened ? toggle : undefined}
          href="/"
          p={0}
          m={0}
          mt="sm"
          hiddenFrom="xs"
        >
          <Image
            quality={100}
            src={BlobsuLogo}
            width={50}
            height={50}
            alt="logo"
          />
        </UnstyledButton>
        <Menu width="97vw">
          <Menu.Target>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />
          </Menu.Target>

          <Menu.Dropdown
            onClick={toggle}
            hiddenFrom="xs"
            bg="black"
            className={classes.menu}
          >
            <Menu.Item component={Link} href="/leaderboard">
              Leaderboard
            </Menu.Item>
            <Menu.Item component={Link} href="/topplays/0/1">
              Top Plays
            </Menu.Item>
            <Menu.Item component={Link} href="/">
              Rules
            </Menu.Item>
            {mobileLog}
          </Menu.Dropdown>
        </Menu>
      </Container>
    </header>
  );
}
