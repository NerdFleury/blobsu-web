"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, AppShell } from "@mantine/core";
import { HeaderMenu } from "./components/client/Header";

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
        <MantineProvider defaultColorScheme="dark">
          <AppShell header={{ height: 56 }}>
            <AppShell.Header>
              <HeaderMenu />
            </AppShell.Header>
            <AppShell.Main mt={50}>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
