import React from 'react';
import { Text } from '../common/Text';

type LocationInfoMiniCardProps = {
    image: string;
    name: string;
    location: string;
};

export default function LocationInfoMiniCard({ image, name, location }: LocationInfoMiniCardProps) {
    return (
        <div className="flex items-center gap-8pxr w-fit">
            <div className="w-50pxr h-50pxr rounded-5pxr">
                <img className='w-full h-full' src ={image}/>
            </div>
            <div className ="flex w-218pxr flex-col items-start">
                <Text fontSize={16} fontWeight={700} color="gray700">
                    {name}
                </Text>
                <Text fontSize={14} fontWeight={400} color="gray600">
                    {location}
                </Text>
            </div>
        </div>
    );
}