import React from 'react';
import { Text } from '../common/Text';
import { IconCancel } from '@/public/icons';

type LocationDeleteButtonProps = {
    image: string;
    name: string;
    onClick: () => void;
}

export default function LocationDeleteButton({ image, name, onClick }: LocationDeleteButtonProps) {
    return (
        <div className='relative w-47pxr h-65pxr flex flex-col items-start gap-4pxr'>
            <div className='relative w-full'>
                <img className='w-47pxr h-45pxr rounded-4pxr' src={image} alt={name} />
                <button onClick={onClick} className='absolute top-0 left-8 w-24pxr h-24pxr flex items-center justify-center'>
                    <IconCancel />
                </button>
            </div>
            <Text className='text-center truncate w-full' fontSize={12} fontWeight={500} color='gray700'>
                {name}
            </Text>
        </div>
    );
}