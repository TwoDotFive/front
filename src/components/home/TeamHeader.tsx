import { teams } from '@/constants/teams';
import Image from 'next/image';
import { Text } from '../common/Text';
import { IconHamburger, IconPerson } from '@/public/icons';

interface TeamCodeProps {
	teamCode: string;
}

export default function TeamHeader({ teamCode }: TeamCodeProps) {
	const team = teams.find((team) => team.code === teamCode)!;
	const { name } = team;
	const count = 2;

	return (
		<section className="relative w-full">
			{/**
			 * Icon 영역
			 */}
			<section>
				<div className="absolute top-55pxr left-20pxr cursor-pointer">
					<IconHamburger />
				</div>
				<div className="absolute top-55pxr right-20pxr cursor-pointer">
					<IconPerson />
				</div>
			</section>
			{/**
			 * Info 영역
			 */}
			<Image
				src={`/images/${team.code}_bg.png`}
				width={399}
				height={0}
				alt={team.name}
				className="w-full h-auto object-contain"
			/>
			<div
				className="absolute flex flex-col gap-[6vw]"
				style={{
					top: 'calc(50% + 40px)',
					left: '20px',
					transform: 'translateY(-50%)',
				}}
			>
				<span>
					<Text fontWeight={700} color="white" fontSize={24}>
						{name}
					</Text>
					<Text fontWeight={500} color="white" fontSize={24}>
						이번 주 경기 {count}개
					</Text>
				</span>
				<span>
					<Text
						fontWeight={400}
						color="white"
						fontSize={14}
						className="cursor-pointer"
					>
						관심 팀 수정하기
					</Text>
				</span>
			</div>
		</section>
	);
}
