import { FloatingFanpoolMakeButton } from '@/components/home/FloatingFanpoolMakeButton';
import InfoSection from '@/components/home/InfoSection';
import TeamHeader from '@/components/home/TeamHeader';

export default function page() {
	return (
		<main className="relative w-full flex flex-col">
			<TeamHeader teamCode="" />
			<InfoSection teamCode="doosan" />
			<FloatingFanpoolMakeButton />
		</main>
	);
}
