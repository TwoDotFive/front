import React from 'react';
import { Text } from '../common/Text';
import TagLocation from '../tag/TagLocation';

type LocationInfoCardProps = {
    image: string;
    name: string;
    location: string;
    tagNames: string[];
};

export default function LocationInfoCard({ image, name, location, tagNames }: LocationInfoCardProps) {
    return (
        <div className="flex items-center gap-8pxr w-full h-74pxr">
            <div className="w-74pxr h-74pxr rounded-5pxr">
                <img className='w-full h-full' src ={image}/>
            </div>
            <div className ="flex flex-col justify-between items-start flex-1 self-stretch">
                <Text fontSize={16} fontWeight={700} color="gray700">
                    {name}
                </Text>
                <Text fontSize={14} fontWeight={400} color="gray600">
                    {location}
                </Text>
                <div className='flex items-start gap-4pxr'>
                    {/* 위치 정보에 따른 TagLocation 삽입 */}
                    {tagNames.map((tag) => (
                        <TagLocation key={tag} name={tag}/>
                    ))}
                </div>
            </div>
        </div>
    );
}