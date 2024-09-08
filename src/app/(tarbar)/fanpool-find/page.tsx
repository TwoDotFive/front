import TapBar from '@/components/common/TapBar';
import FindSection from '@/components/fanpool-find/FindSection';

export default function page() {
	return (
		<section>
			<TapBar text="팬풀 찾아보기" type="mid" isNextButton={false} />
			<div className="h-24pxr" />
			<FindSection />
		</section>
	);
}
