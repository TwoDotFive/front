import { useState, useEffect } from 'react';
import { IconRightArrow } from '@/public/icons';
import { Text } from '../common/Text';
import getUserProfile from '@/api/user/getUserProfile';
import { UserProfileResponse } from '@/types/types';

interface FanpoolHostProps {
	hostUserId: number;
}

export default function FanpoolHost({ hostUserId }: FanpoolHostProps) {
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				// hostUserId를 이용하여 사용자 프로필 조회
				const response = await getUserProfile({
					userId: hostUserId.toString(),
				});
				setUserProfile(response);
			} catch (err) {
				console.error('Failed to fetch user profile:', err);
				setError('사용자 정보를 불러오지 못했습니다.');
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfile();
	}, [hostUserId]);

	if (loading) {
		return <div>Loading...</div>; // 로딩 상태
	}

	if (error) {
		return <div>{error}</div>; // 오류 발생 시
	}

	if (!userProfile) {
		return null; // 프로필 데이터가 없으면 아무것도 렌더링하지 않음
	}

	return (
		<div>
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
							{userProfile.userRole === 'host' ? '호스트' : '사용자'}
						</Text>
					</div>
				</div>
				<IconRightArrow />
			</section>
		</div>
	);
}
