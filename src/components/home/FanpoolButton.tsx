import { IconRightArrow } from '@/public/icons';
import { Text } from '../common/Text';

export default function FanpoolButton() {
	/**
	 * TODO count 계산하기
	 */
	const count = 136;
	return (
		<section className="w-full items-center bg-white text-center flex justify-between rounded-b-12pxr py-12pxr px-14pxr cursor-pointer">
			<div className="w-16pxr" />
			<Text fontSize={14} fontWeight={500} color="kboNavy">
				현재 팬풀
				<Text fontSize={14} fontWeight={700} className="inline-block">
					{count}
				</Text>
				건
			</Text>
			<IconRightArrow />
		</section>
	);
}
