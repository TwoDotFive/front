import React from 'react';
import { Text } from '../common/Text';
import LocationInfoMiniCard from './LocationInfoMiniCard';
import Button from '../common/Button';

type TravelogLocationCardProps = {
    image: string;
    name: string;
    location: string;
    userId :string;  // 수정 필요
}

export default function TravelogLocationCard({image, name, location, userId}: TravelogLocationCardProps){
    if(userId !== 'myUserId'){
        return (
            <div className='flex w-300pxr p-12pxr items-center gap-8pxr flex-shrink-0 rounded-8pxr bg-gray000'>
                <LocationInfoMiniCard image={image} name={name} location={location} />
            </div>
        );
    }
    return (
        <div className='flex w-300pxr p-12pxr items-center gap-8pxr flex-shrink-0 rounded-8pxr bg-gray000'>
            <div className='flex flex-col items-start gap-8pxr'>
                <LocationInfoMiniCard image={image} name={name} location={location} />
                <Button
					width="276px"
					height="40px"
					text={'메모추가'}
					borderRadius={8}
					fontSize={14}
					fontWeight={700}
					enabledTextColor={'text-kboBlue500'}
					enabledBackgroundColor={'bg-kboBlue0'}
					disabledTextColor={'text-gray600'}
					disabledBackgroundColor={'bg-gray050'}
					onClick={() => {}}
				/>
            </div>
        </div>
    )
}