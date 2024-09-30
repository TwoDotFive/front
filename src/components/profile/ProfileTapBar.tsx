'use client';
import { IconLeftArrow, IconMoreMenu, IconPencil } from '@/public/icons';
import { Text } from '../common/Text';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useState } from 'react';
import { ProfileMenuBottomSheet } from './ProfileMenuBottomSheet';

export default function ProfileTapbar({ id }: { id?: string }) {
	const userId = useUserStore((state) => state.userProfile?.id);
	const isMe = id === undefined || userId === id;
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};
	const [menuVisible, setMenuVisible] = useState(false);
	return (
		<div className="w-full h-49pxr flex items-center px-12pxr justify-between">
			{isMe ? (
				<div className="w-25pxr h-24pxr" />
			) : (
				<IconLeftArrow className="cursor-pointer" onClick={handleBack} />
			)}
			<Text fontSize={18} fontWeight={500} color="gray700">
				프로필
			</Text>
			{isMe ? (
				<IconPencil
					className="cursor-pointer"
					onClick={() => {
						router.push('profile/edit');
					}}
				/>
			) : (
				<IconMoreMenu
					className="cursor-pointer"
					onClick={() => {
						setMenuVisible(true);
					}}
				/>
			)}
			<ProfileMenuBottomSheet
				isVisible={menuVisible}
				onClose={() => setMenuVisible(false)}
				targetUserId={id!}
			/>
		</div>
	);
}
