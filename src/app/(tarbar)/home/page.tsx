import InfoSection from '@/components/home/InfoSection';
import TeamHeader from '@/components/home/TeamHeader';

export default function page() {
	return (
		<main className="w-full flex flex-col">
			<TeamHeader teamCode="" />
			<InfoSection teamCode="doosan" />
		</main>
	);
}
