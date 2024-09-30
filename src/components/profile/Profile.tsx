'use client';
import Image from 'next/image';
import { Text } from '../common/Text';
import { useUserStore } from '@/store/useUserStore';
import ProfileDongne from './ProfileDongne';
import { useEffect, useState } from 'react';
import getUserProfile from '@/api/user/getUserProfile';

interface UserProfile {
	id: string;
	nickname: string;
	oneLiner: string;
	profileImageUrl: string;
	favoriteTeam: {
		name: string;
		representativeImageUrl: string;
	};
}

export default function Profile({ id }: { id?: string }) {
	const { setUserProfile } = useUserStore();
	const userId = useUserStore((state) => state.userProfile?.id);
	const searchId = id || userId;
	const [userProfile, setUserProfiles] = useState<UserProfile | null>(null);
	const [imgSrc, setImgSrc] = useState('/images/image_profile_default.png');

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const response = await getUserProfile({ userId: searchId! });
				setUserProfiles(response);
				if (id === undefined) setUserProfile(response);
				setImgSrc(
					response.profileImageUrl || '/images/image_profile_default.png'
				);
			} catch (error) {
				console.error('Failed to fetch user profile:', error);
			}
		};
		getUserInfo();
	}, [searchId]);

	const handleImageError = () => {
		setImgSrc('/images/image_profile_default.png');
	};

	return (
		<section>
			<div className="h-14pxr" />
			<div className="flex flex-col items-center">
				{/* 프로필 이미지 */}
				<img
					src={imgSrc}
					alt={'프로필 이미지'}
					onError={handleImageError}
					className="w-80pxr h-80pxr rounded-full"
				/>
				<div className="h-8pxr" />

				{/* 닉네임 */}
				<Text fontSize={16} fontWeight={700} color="gray700">
					{userProfile?.nickname}
				</Text>

				<div className="h-2pxr" />

				{/* 동네 정보 */}
				<ProfileDongne />

				<div className="h-14pxr" />

				{/* 한 줄 소개 */}
				<Text
					fontSize={12}
					fontWeight={500}
					color="gray600"
					className="w-full text-center"
				>
					{userProfile?.oneLiner}
				</Text>

				<div className="h-8pxr" />

				{/* 응원 팀 정보 */}
				{userProfile?.favoriteTeam && (
					<div className="flex gap-4pxr items-center">
						<Image
							src={userProfile.favoriteTeam.representativeImageUrl}
							width={26}
							height={26}
							alt="팀 로고"
						/>
						<Text fontSize={12} fontWeight={700}>
							{userProfile.favoriteTeam.name}
							<Text fontSize={12} fontWeight={500} className="inline">
								에 관심있어요
							</Text>
						</Text>
					</div>
				)}
			</div>
		</section>
	);
}
