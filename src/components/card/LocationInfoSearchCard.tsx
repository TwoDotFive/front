import React from 'react';
import { Text } from '../common/Text';
import SelectButton from '../common/button/SelectButton';

type LocationInfoSearchCardProps = {
    image: string;
    name: string;
    location: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function LocationInfoSearchCard({image, name, location, isSelected, onClick}: LocationInfoSearchCardProps){
    return (
        <div className='flex items-center gap-4pxr w-full h-50pxr'>
            <div className='flex items-center gap-8pxr flex-1'>
                <div className='w-50pxr h-50pxr rounded-5pxr'>
                    <img className='w-full h-full rounded-5pxr' src={image}/>
                </div>
                <div className='flex flex-col justify-between items-start flex-1 self-stretch'>
                    <Text fontSize={16} fontWeight={700} color='gray700'>
                        {name}
                    </Text>
                    <Text fontSize={14} fontWeight={400} color='gray600'>
                        {location}
                    </Text>
                </div>
            </div>
            <div className='ml-auto'>
                <SelectButton isSelected={isSelected} onClick={onClick}/>
            </div>
        </div>
    );
}
