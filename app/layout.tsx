"use client";

import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  Text,
  DEFAULT_THEME,
} from "@mantine/core";
import { Header } from "./components/client/Header";
import Footer from "./components/client/Footer";
import { Poppins } from "./styles/Poppins/Poppins";
import { Suspense } from "react";
import { MiniProfile } from "./components/server/HeaderProfile";
import { MobileProfile } from "./components/server/MobileHeaderProfile";
import localFont from "next/font/local";
import Background from "./components/client/Background";
import "./globals.css";
import Loader from "./loading";

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
            <AppShell.Header withBorder={false}>
              <Header
                children={
                  <Suspense fallback={<Loader />}>
                    <MiniProfile />
                  </Suspense>
                }
                mobileChild={
                  <Suspense fallback={<Text>...</Text>}>
                    <MobileProfile />
                  </Suspense>
                }
              />
            </AppShell.Header>
            <Background />
            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Footer pos={"static"} withBorder={false}>
              <Footer />
            </AppShell.Footer>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
