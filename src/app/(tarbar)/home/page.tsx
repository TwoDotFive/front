'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore'; // Zustand 스토어 불러오기
import { FloatingFanpoolMakeButton } from '@/components/home/FloatingFanpoolMakeButton';
import InfoSection from '@/components/home/InfoSection';
import TeamHeader from '@/components/home/TeamHeader';

export default function Page() {
	const { userProfile, fetchUserProfile, clearUserProfile } = useUserStore();

	useEffect(() => {
		fetchUserProfile('0');

		return () => {
			clearUserProfile();
		};
	}, [fetchUserProfile, clearUserProfile]);

	if (!userProfile) {
		return <div>Loading...</div>;
	}

	return (
		<main className="relative w-full flex flex-col">
			<TeamHeader />
			<InfoSection teamCode="doosan" />
			<FloatingFanpoolMakeButton />
		</main>
	);
}
