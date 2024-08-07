import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  DEFAULT_THEME,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
} from "@mantine/core";
import { Header } from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Poppins } from "./styles/Poppins/Poppins";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MiniProfile } from "./components/Layout/HeaderProfile";
import { MobileProfile } from "./components/Layout/MobileHeaderProfile";
import Background from "./components/Layout/Background";
import "./globals.css";
import Loader from "./loading";

export const metadata: Metadata = {
  title: "Blobsu Server",
  description: 'An osu! private server with a "unique" concept',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="any" />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" />
        <link rel="icon" type="image/png" sizes="192x192" />
        <meta property="og:title" content="Blobsu" />
        <meta
          property="og:description"
          content="A private osu! server by Pana"
        />
        <ColorSchemeScript />
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
          <AppShell header={{ height: 54 }}>
            <AppShellHeader withBorder={false}>
              <Header>
                <Suspense fallback={<Loader />}>
                  <MiniProfile />
                  <MobileProfile />
                </Suspense>
              </Header>
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
            <AppShellFooter pos={"static"} withBorder={false}>
              <Footer />
            </AppShellFooter>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
