import GameSchedule from './GameSchedule/GameSchedule';
import LiveFanPool from './LiveFanPool/LiveFanPool';
import RecentFanpoolLog from './RecentFanpoolLog/RecentFanpoolLog';

interface TeamCodeProps {
	teamCode: string;
}
export default function InfoSection({ teamCode }: TeamCodeProps) {
	return (
		<section className="w-full bg-white pt-12pxr px-20pxr rounded-t-8pxr -mt-8pxr z-50">
			<GameSchedule />

			<div className="h-40pxr" />
			<LiveFanPool />
			<div className="h-40pxr" />
		</section>
	);
}
