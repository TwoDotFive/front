import { Text } from '../common/Text';

interface FanpoolByHostProps {
	hostUserId: number;
}

export default function FanpoolByHost({ hostUserId }: FanpoolByHostProps) {
	return (
		<section className="px-20pxr">
			<div className="h-14pxr" />
			<Text fontSize={18} fontWeight={700} color="gray700">
				주최자가 등록한 팬풀로그에요!
			</Text>
			{/* 팬풀로그 화면들 구현 */}
			<div className="h-200pxr" />
		</section>
	);
}
