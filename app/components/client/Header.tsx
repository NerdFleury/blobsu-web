"use client";

import { ReactElement, useEffect, useState } from "react";
import { Container, Group, Burger, Menu, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BlobsuLogo from "@/public/logo.png";
import classes from "@/app/components/styles/Headers.module.css";
import Image from "next/image";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/leaderboard", label: "Leaderboard" },
  { link: "/", label: "Top Plays" },
  { link: "/", label: "Rules" },
];

export function Header({ children }: { children: ReactElement }) {
  const [opened, { toggle }] = useDisclosure(false);

  const [icon, setIcon] = useState<any | null>();
  const [mobileLog, setMobileLog] = useState<any | null>();

  useEffect(() => {
    setIcon(children.props.children[0]);
    console.log(children);
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
        <Container mt="sm" p={0} m={0} visibleFrom="xs">
          <Image src={BlobsuLogo} width={60} height={60} alt="logo" />
        </Container>
        <Group align="center" gap={5} visibleFrom="xs">
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
            <Menu.Item c="white" component={Link} href="/leaderboard">
              Leaderboard
            </Menu.Item>
            <Menu.Item c="white" component={Link} href="/">
              Top Plays
            </Menu.Item>
            <Menu.Item c="white" component={Link} href="/">
              Rules
            </Menu.Item>
            {mobileLog}
          </Menu.Dropdown>
        </Menu>
      </Container>
    </header>
  );
}
