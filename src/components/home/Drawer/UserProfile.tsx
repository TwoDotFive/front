import { Text } from '@/components/common/Text';

interface UserProfileProps {
	name: string;
	fanpoolCount: number;
	fanpoolLogCount: number;
}

export default function UserProfile({
	name,
	fanpoolCount,
	fanpoolLogCount,
}: UserProfileProps) {
	return (
		<section className="flex gap-4pxr">
			<div className="w-40pxr h-40pxr rounded-full bg-gray100" />
			<div className="flex flex-col justify-center">
				<Text fontSize={12} fontWeight={700} color="gray700">
					{name}
				</Text>
				<Text fontSize={12} fontWeight={400} color="gray700">
					{fanpoolCount}개의 팬풀 | {fanpoolLogCount}개의 여행기
				</Text>
			</div>
		</section>
	);
}
