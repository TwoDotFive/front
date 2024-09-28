'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { FloatingFanpoolMakeButton } from '@/components/home/FloatingFanpoolMakeButton';
import InfoSection from '@/components/home/InfoSection';
import TeamHeader from '@/components/home/TeamHeader';
import getGameSchedule from '@/api/baseball/getGameSchedule';

export default function Page() {
	const { userProfile, fetchUserProfile, clearUserProfile } = useUserStore();
	const [gameSchedule, setGameSchedule] = useState<any>(null);

	useEffect(() => {
		fetchUserProfile('0');

		return () => {
			clearUserProfile();
		};
	}, [fetchUserProfile, clearUserProfile]);

	useEffect(() => {
		const fetchGameSchedules = async () => {
			if (userProfile?.favoriteTeam?.id) {
				try {
					const response = await getGameSchedule();
					setGameSchedule(response);
					console.log('Fetched games:', response);
				} catch (error) {
					console.error('Error fetching games:', error);
				}
			}
		};

		fetchGameSchedules();
	}, [userProfile]);

	if (!userProfile) {
		return <div>Loading...</div>;
	}

	return (
		<main className="relative w-full flex flex-col">
			<TeamHeader gameSchedule={gameSchedule} userProfile={userProfile} />
			<InfoSection gameSchedule={gameSchedule} />
			<FloatingFanpoolMakeButton />
		</main>
	);
}
