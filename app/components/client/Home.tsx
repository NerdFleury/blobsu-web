"use client";

import styles from "../../page.module.css";
import { useRouter } from "next/navigation";

export default function Home({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <h2>Welcome to blobsu site</h2>
      <button type="button" onClick={() => router.push("/create")}>
        Create account
      </button>
      {children}
    </main>
  );
}
