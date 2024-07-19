import back from "@/public/BACKGROUND 1.png";
import Image from "next/image";

export default function Background() {
  return (
    <div style={{ flexShrink: 0 }}>
      <Image
        src={back}
        alt="background"
        placeholder="blur"
        quality={100}
        priority
        style={{
          zIndex: -1,
          objectFit: "cover",
        }}
        fill
        sizes="200vh"
      />
    </div>
  );
}
