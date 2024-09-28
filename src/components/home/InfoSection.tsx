import { FloatingFanpoolMakeButton } from './FloatingFanpoolMakeButton';
import GameSchedule from './GameSchedule/GameSchedule';
import LiveFanPool from './LiveFanPool/LiveFanPool';

interface InfoSectionProps {
	gameSchedule: { games: any[]; numberOfGame: number } | null;
}

export default function InfoSection({ gameSchedule }: InfoSectionProps) {
	return (
		<section className="relative w-full bg-white pt-12pxr px-20pxr rounded-t-8pxr -mt-8pxr z-50">
			<GameSchedule gameSchedule={gameSchedule} />
			<div className="h-40pxr" />
			<LiveFanPool />
			<div className="h-40pxr" />
		</section>
	);
}
