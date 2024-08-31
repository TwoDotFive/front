'use client';
import React from 'react';
import { Text } from '@/components/common/Text';
import TagLocation from '@/components/common/tag/TagLocation';
import { useRouter } from 'next/navigation';

type FanpoolCardProps = {
    id: number;
    image: string;
    title: string;
    location: string;
    review: number;
    tagNames: string[];
}

export default function TeamFanpoolCard({id, image, title, location, review, tagNames}: FanpoolCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/fanpool-log/${id}`);
    }
    return(
        <div className='relative flex items-center gap-12pxr self-stretch w-320pxr h-104pxr' onClick={handleClick}>
            <img className='w-82pxr h-full rounded-9pxr' src={image} />
            <div className='flex flex-col items-start gap-6pxr'>
                <Text fontSize={16} fontWeight={600} color='black'>{title}</Text>
                <Text fontSize={12} fontWeight={400} color='black'>{location}</Text>
                <Text fontSize={12} fontWeight={400} color='black'>별점 {review}점</Text>
                <div className='flex items-start gap-4pxr'>
                    {tagNames.map((tag) => (
                        <TagLocation key={tag} name={tag}/>
                    ))}
                </div>
            </div>
        </div>
    );
}