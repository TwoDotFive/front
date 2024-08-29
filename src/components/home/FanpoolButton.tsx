import { Text } from '../common/Text';

export default function FanpoolButton() {
	/**
	 * TODO count 계산하기
	 */
	const count = 136;
	return (
		<section className="w-full bg-primary text-center rounded-8pxr py-11pxr px-14pxr cursor-pointer">
			<Text fontSize={16} fontWeight={600} color="white">
				현재 팬풀 {count}건
			</Text>
		</section>
	);
}
