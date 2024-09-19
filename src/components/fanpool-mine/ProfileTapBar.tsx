'use client';
import { IconPencil } from '@/public/icons';
import { Text } from '../common/Text';

export default function ProfileTapbar() {
	return (
		<div className="w-full h-49pxr flex items-center px-12pxr justify-between">
			<div className="w-25pxr h-24pxr" />
			<Text fontSize={18} fontWeight={500} color="gray700">
				프로필
			</Text>
			<IconPencil className="cursor-pointer" onClick={() => {}} />
		</div>
	);
}
