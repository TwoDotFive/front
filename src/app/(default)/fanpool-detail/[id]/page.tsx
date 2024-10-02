'use client';
import { useState, useEffect } from 'react';
import InfinityLine from '@/components/common/InfinityLine';
import FanpoolByHost from '@/components/fanpool-detail/FanpoolByHost';
import FanpoolDetail from '@/components/fanpool-detail/FanpoolDetail';
import FanpoolDetailBottomBar from '@/components/fanpool-detail/FanpoolDetailBottomBar';
import FanpoolHost from '@/components/fanpool-detail/FanpoolHost';
import GameInfo from '@/components/fanpool-detail/GameInfo';

import getFanpoolDetail from '@/api/fanpool/getFanpoolDetail';
import { FanpoolInformation } from '@/types/types';

export default function Page({ params }: { params: { id: number } }) {
	const fanpoolId = params.id;

	const [fanpoolInformation, setFanpoolInformation] =
		useState<FanpoolInformation | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (fanpoolId) {
			const fetchFanpoolDetail = async () => {
				try {
					const response = await getFanpoolDetail(fanpoolId.toString());
					setFanpoolInformation(response.fanpoolInformation);
				} catch (error) {
					console.error('Error fetching fanpool detail:', error);
				} finally {
					setLoading(false);
				}
			};

			fetchFanpoolDetail();
		}
	}, [fanpoolId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!fanpoolInformation) {
		return <div>팬풀 정보를 가져오지 못했습니다.</div>;
	}

	return (
		<section className="relative">
			<GameInfo fanpoolInformation={fanpoolInformation} />
			<div className="h-24pxr" />
			<div className="px-20pxr">
				<FanpoolHost hostUserId={fanpoolInformation.hostUserId} />
				<div className="h-40pxr" />
				<FanpoolDetail fanpoolInformation={fanpoolInformation} />
			</div>
			<InfinityLine color="bg-gray100" thickness="h-6pxr" />
			<FanpoolByHost hostUserId={fanpoolInformation.hostUserId} />
			<FanpoolDetailBottomBar fanpoolInformation={fanpoolInformation} />
		</section>
	);
}
