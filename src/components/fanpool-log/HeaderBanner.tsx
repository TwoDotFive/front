'use client';

import Image from "next/image";
import { Text } from "../common/Text";

interface HeaderBannerProps {
    imageUrl: string;
    title: string;
    description: string;
    nickname: string;
    userImgUrl: string;
}

export default function HeaderBanner({imageUrl, title, description, nickname, userImgUrl}: HeaderBannerProps) {
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
                    className="absolute flex flex-col gap-[2vw]"
                    style={{
                        top: 'calc(50% + 100px)',
                        padding: '0 20px',
                        transform: 'translateY(-50%)',
                    }}
                >
                        <Text fontWeight={700} color="white" fontSize={24}>
                            {title}
                        </Text>
                        <Text fontWeight={400} color="white" fontSize={12}>
                        {description}
                        </Text>
                    
                    <div className="flex gap-4pxr">
                        <Image
                            src={userImgUrl}
                            width={399}
                            height={0}
                            alt={"kt"}
                            className="w-18pxr h-18pxr object-cover rounded-full"
                        />
                        <Text
                            fontWeight={700}
                            color="white"
                            fontSize={12}
                            className="cursor-pointer"
                        >
                            {nickname}
                        </Text>
                    </div>
                </div>
            </section>
        </>
    )
}
