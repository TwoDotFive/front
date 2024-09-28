import TapBar from '@/components/common/TapBar';
import FanpoolAddForm from '@/components/fanpool-add/FanpoolAddForm';

export default function page() {
	return (
		<section>
			<TapBar text="팬풀 모집하기" type="mid" />
			<FanpoolAddForm />
		</section>
	);
}
