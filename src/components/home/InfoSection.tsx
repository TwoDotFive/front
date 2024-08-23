import FanpoolButton from './FanpoolButton';
import GameSchedule from './GameSchedule/GameSchedule';
import LiveFanPool from './LiveFanPool/LiveFanPool';

interface TeamCodeProps {
	teamCode: string;
}
export default function InfoSection({ teamCode }: TeamCodeProps) {
	return (
		<section className="w-full overflow-y-scroll bg-white pt-12pxr px-20pxr rounded-t-8pxr -mt-8pxr z-50">
			<GameSchedule />
			<div className="h-13pxr" />
			{/**
			 * 팬풀 검색 버튼
			 */}
			<FanpoolButton />
			<div className="h-82pxr" />
			<LiveFanPool />
			<div className="h-40pxr" />
		</section>
	);
}
