'use client';
import Image from 'next/image';
import { Text } from '../common/Text';
import { useUserStore } from '@/store/useUserStore';
import ProfileDongne from './ProfileDongne';

export default function Profile() {
	const { userProfile } = useUserStore();
	console.log(userProfile);
	return (
		<section>
			<div className="h-14pxr" />
			<div className="flex flex-col items-center">
				<Image
					src={
						userProfile?.profileImageUrl || '/images/image_profile_default.png'
					}
					width={80}
					height={80}
					alt={''}
				/>
				<div className="h-8pxr" />
				<Text fontSize={16} fontWeight={700} color="gray700">
					{userProfile?.nickname}
				</Text>
				<div className="h-2pxr" />

				<ProfileDongne />
				<div className="h-14pxr" />
				<Text
					fontSize={12}
					fontWeight={500}
					color="gray600"
					className="w-full text-center"
				>
					{userProfile?.oneLiner}
				</Text>
				<div className="h-8pxr" />
				<div className="flex gap-4pxr items-center">
					<Image
						src={userProfile?.favoriteTeam.representativeImageUrl!}
						width={26}
						height={26}
						alt=""
					/>
					<Text fontSize={12} fontWeight={700}>
						{userProfile?.favoriteTeam.name}
						<Text fontSize={12} fontWeight={500} className="inline">
							에 관심있어요
						</Text>
					</Text>
				</div>
			</div>
		</section>
	);
}
