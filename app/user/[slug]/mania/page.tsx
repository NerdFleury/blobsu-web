"use client";

import Page from "@/app/components/Profile/userPage";
import { Suspense } from "react";
import { ModeSwitch } from "@/app/components/Profile/FloatingUserIndicator";

export default function stdPage({ params }: { params: { slug: string } }) {
  return (
    <ModeSwitch params={params}>
      <Suspense>
        <Page params={params} mode={3} />
      </Suspense>
    </ModeSwitch>
  );
}
