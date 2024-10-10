'use client';
import { IconLeftArrow } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { Text } from '../Text';
import { useEffect, useState } from 'react';
import getUserProfile from '@/api/user/getUserProfile';
import { UserProfileResponse } from '@/types/types';

export default function ChatTapBar() {
	const [userInfo, setUserInfo] = useState<UserProfileResponse | null>(null);
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await getUserProfile({
					userId: localStorage.getItem('otherId')!,
				});
				setUserInfo(response);
			} catch (err) {
				console.error(err);
			}
		};

		fetchUserProfile();
	}, []);

	return (
		<div className="w-full flex items-center gap-4pxr px-12pxr py-11pxr">
			<IconLeftArrow className="cursor-pointer" onClick={handleBack} />
			<div className="flex flex-col">
				<Text fontSize={16} fontWeight={700} color="gray700">
					{userInfo?.nickname}
				</Text>
				<div className="flex items-center">
					<Text
						fontSize={12}
						fontWeight={700}
						color="gray700"
						className="mr-4pxr"
					>
						{userInfo?.favoriteTeam.name}
					</Text>
					<Text
						fontSize={12}
						fontWeight={500}
						color="gray500"
						className="mr-8pxr"
					>
						{userInfo?.hostedFanpoolNumber}개의 팬풀,{' '}
						{userInfo?.hostedTourLogNumber}개의 여행기
					</Text>
				</div>
			</div>
		</div>
	);
}
