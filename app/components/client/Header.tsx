"use client";

import { Menu, Group, Center, Burger, Container, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { IconCircleNumber0 } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";
import classes from "../styles/Headers.module.css";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/leaderboard?sort=pp&mode=0&pagenumber=1", label: "Leaderboard" },
  {
    link: "#1",
    label: "Connect",
    links: [
      { link: "/howto", label: "How To Connect" },
      { link: "/faq", label: "FAQ" },
      { link: "/discord", label: "Discord Community" },
    ],
  },
  { link: "/settings", label: "Settings" },
  { link: "/filler", label: "More To Come" },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Center>
        <Container size="100%">
          <div className={classes.inner}>
            <Group align="center" gap={5} visibleFrom="sm">
              {items}
            </Group>

            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
          </div>
        </Container>
      </Center>
    </header>
  );
}
