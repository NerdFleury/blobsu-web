"use client";

import Page from "@/app/components/server/userPage";
import { Suspense } from "react";
import { ModeSwitch } from "@/app/components/client/FloatingUserIndicator";

export default function stdPage({ params }: { params: { slug: string } }) {
  return (
    <ModeSwitch params={params}>
      <Suspense>
        <Page params={params} mode={4} />
      </Suspense>
    </ModeSwitch>
  );
}
