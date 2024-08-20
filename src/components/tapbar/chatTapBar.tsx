import { IconLeftArrow } from '@/public/icons';
import { useRouter } from 'next/navigation';
import { Text } from '../common/Text';

type ChatTapBarProps = {
	text: string;
	team: string;
	fanpoolCount: number;
	fanpoolLogCount: number;
};

export default function ChatTapBar({
	text,
	team,
	fanpoolCount,
	fanpoolLogCount,
}: ChatTapBarProps) {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="w-full h-40pxr flex items-center gap-4pxr px-12pxr">
			<IconLeftArrow className="cursor-pointer" onClick={handleBack} />
			<div className="flex flex-col">
				<Text fontSize={16} fontWeight={700} color="gray700">
					{text}
				</Text>
				<div className="flex items-center">
					<Text
						fontSize={12}
						fontWeight={700}
						color="gray700"
						className="mr-4pxr"
					>
						{team}
					</Text>
					<Text
						fontSize={12}
						fontWeight={500}
						color="gray500"
						className="mr-8pxr"
					>
						{fanpoolCount}개의 팬풀, {fanpoolLogCount}개의 여행기
					</Text>
				</div>
			</div>
		</div>
	);
}
