"use client";

import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  DEFAULT_THEME,
} from "@mantine/core";
import Header from "./components/client/Header";
import { Poppins } from "./styles/Poppins/Poppins";
import { Suspense } from "react";
import { MiniProfile } from "./components/server/HeaderProfile";
import Background from "./components/client/Background";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body>
        <MantineProvider
          defaultColorScheme="dark"
          theme={{
            fontFamily: Poppins.style.fontFamily,
            primaryColor: "cyan",
            headings: {
              fontFamily: `${Poppins.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
            },
          }}
        >
          <AppShell header={{ height: 56 }}>
            <AppShell.Header>
              <Header>
                <Suspense>
                  <MiniProfile />
                </Suspense>
              </Header>
            </AppShell.Header>
            <Background />
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
