"use client";

import Image from "next/image";
import { IconBookMarkWhite } from "@/public/icons";
import { useRouter } from "next/navigation";

interface HeaderBannerProps {
  imageUrl: string;
}

export default function HeaderBanner({ imageUrl }: HeaderBannerProps) {
  const router = useRouter();

  const handleBookmarkButton = () => {
    router.push("/bookmark");
  };

  return (
    <>
      <section className="relative w-full h-337pxr">
        <Image
          src={imageUrl}
          width={399}
          height={0}
          alt={"kt"}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute flex flex-col gap-18pxr"
          style={{
            top: "24px",
            right: "12px",
            transform: "translateY(-50%)",
          }}
        >
          <button className="color-white" onClick={handleBookmarkButton}>
            <IconBookMarkWhite />
          </button>
        </div>
      </section>
    </>
  );
}
