import { useEffect, useState } from 'react';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';
import getFanpoolDetail from '@/api/fanpool/getFanpoolDetail';
import { FanpoolInformation } from '@/types/types';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useRouter } from 'next/navigation';
import { Tags } from '@/constants/tags';

export default function ChatGameInfo() {
	const router = useRouter();
	const [fanpoolInformation, setFanpoolInformation] =
		useState<FanpoolInformation | null>(null);
	useEffect(() => {
		const fetchFanpoolDetail = async () => {
			try {
				const fanpoolId = localStorage.getItem('fanpoolId');
				if (fanpoolId) {
					const response = await getFanpoolDetail(fanpoolId);
					setFanpoolInformation(response.fanpoolInformation);
				}
			} catch (error) {
				console.error('Error fetching fanpool detail:', error);
			}
		};
		fetchFanpoolDetail();
	}, []);

	const stadiumShort = fanpoolInformation?.game.stadium;
	const awayTeamShort = fanpoolInformation?.game.awayTeam.name;
	const homeTeamShort = fanpoolInformation?.game.homeTeam.name;

	const getFormattedDepartAt = (departAt?: string | null): string => {
		if (!departAt) {
			return '';
		}
		return format(new Date(departAt), 'MM.dd(EEE) HH:mm', { locale: ko });
	};
	const handleCardClick = () => {
		router.push(`/fanpool-detail/${fanpoolInformation?.id}`);
	};
	if (!fanpoolInformation) return null;
	return (
		<section className="py-16pxr px-20pxr flex flex-col gap-4pxr">
			<div className="flex gap-4pxr">
				<Text fontSize={12} fontWeight={700} color="gray700">
					{homeTeamShort} VS {awayTeamShort}
				</Text>
				<Text fontSize={12} fontWeight={400} color="gray700">
					{getFormattedDepartAt(fanpoolInformation.departAt)}, {stadiumShort}
				</Text>
			</div>
			<div className="flex gap-4pxr items-center">
				<TagFanPool type={fanpoolInformation?.fanpoolType as Tags} />
				<TagFanPool type={fanpoolInformation?.genderConstraint as Tags} />
				<Text fontSize={12} fontWeight={400} color="gray700">
					{fanpoolInformation.departFrom.sigungu} 출발,{' '}
					{fanpoolInformation.numberOfPeople -
						fanpoolInformation.currentNumberOfPeople ?? 0}
					명 모집
				</Text>
			</div>
		</section>
	);
}
