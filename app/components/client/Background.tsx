import back from "@/public/BACKGROUND 1.png";
import Image from "next/image";

export default function Background() {
  return (
    <Image
      src={back}
      alt="background"
      placeholder="blur"
      quality={100}
      style={{
        zIndex: -1,
        objectFit: "fill",
      }}
      fill
      sizes="100vw"
    />
  );
}
