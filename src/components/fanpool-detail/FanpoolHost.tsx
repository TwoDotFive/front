import { useState, useEffect } from 'react';
import { IconRightArrow } from '@/public/icons';
import { Text } from '../common/Text';
import getUserProfile from '@/api/user/getUserProfile';
import { UserProfileResponse } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

interface FanpoolHostProps {
	hostUserId: BigInt;
}

export default function FanpoolHost({ hostUserId }: FanpoolHostProps) {
	const router = useRouter();
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loginUserId = useUserStore((state) => state.userProfile?.id);
	const handleProfileClick = () => {
		if (hostUserId.toString() == loginUserId) {
			router.push(`/profile`);
		} else {
			router.push(`/profile/${hostUserId}`);
		}
	};
	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await getUserProfile({
					userId: hostUserId,
				});
				setUserProfile(response);
			} catch (err) {
				console.error('Failed to fetch user profile:', err);
				setError('');
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfile();
	}, [hostUserId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!userProfile) {
		return null;
	}

	return (
		<div onClick={handleProfileClick}>
			<section className="flex gap-4pxr w-full justify-between items-center">
				<div className="flex gap-8pxr">
					{/* 프로필 이미지 */}
					<div className="w-40pxr h-40pxr rounded-full bg-gray100">
						{userProfile.profileImageUrl && (
							<img
								src={userProfile.profileImageUrl}
								alt={`${userProfile.nickname} 프로필 이미지`}
								className="w-full h-full object-cover rounded-full"
							/>
						)}
					</div>

					{/* 사용자 정보 */}
					<div className="flex flex-col justify-center">
						<Text fontSize={12} fontWeight={700} color="gray700">
							{userProfile.nickname}
						</Text>
						<Text fontSize={12} fontWeight={400} color="gray700">
							{userProfile.hostedFanpoolNumber}개의 팬풀 |{' '}
							{userProfile.hostedTourLogNumber}개의 여행기
							{userProfile.userRole === 'host' ? '호스트' : '사용자'}
						</Text>
					</div>
				</div>
				<IconRightArrow />
			</section>
		</div>
	);
}
