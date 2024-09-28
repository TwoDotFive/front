import TapBar from '@/components/common/TapBar';
import { FanpoolAddSection } from '@/components/fanpool-add/FanpoolAddSection';

export default function page() {
	return (
		<section>
			<TapBar text="팬풀 모집하기" type="mid" />
			<FanpoolAddSection />
		</section>
	);
}
