import { format } from 'date-fns';
import { teams } from '@/constants/teams';
import Image from 'next/image';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';

export default function GameCard() {
	/**
	 * TODO 데이터 props로 옮기기
	 */
	const home = 'kiwoom';
	const homeInfo = teams.find((team) => team.code === home)!;
	const away = 'doosan';
	const awayInfo = teams.find((team) => team.code === away)!;

	const placeName = '서울종합운동장 잠실야구장';

	const date = format(new Date(), 'M월 d일 aaa h:mm').toUpperCase();

	return (
		<section className="w-full relative flex flex-col rounded-12pxr">
			<div className="absolute inset-0 bg-primary opacity-50 rounded-12pxr" />

			<div className="relative z-10 flex flex-col">
				{/**
				 * HOME VS AWAY
				 */}
				<section className="w-full py-19pxr">
					<section className="flex justify-center items-center gap-16pxr">
						<div className="flex flex-col gap-8pxr items-center">
							<div className="w-67pxr h-67pxr flex items-center justify-center bg-white rounded-full">
								<Image
									src={`/images/${homeInfo.code}.png`}
									alt={homeInfo.name}
									width={60}
									height={60}
								/>
							</div>
							<Text fontSize={14} fontWeight={700} color="white">
								{homeInfo.name}
							</Text>
						</div>
						<Text fontSize={14} fontWeight={700} color="white">
							VS
						</Text>
						<div className="flex flex-col gap-8pxr items-center">
							<div className="w-67pxr h-67pxr flex items-center justify-center bg-white rounded-full">
								<Image
									src={`/images/${awayInfo.code}.png`}
									alt={awayInfo.name}
									width={60}
									height={60}
								/>
							</div>
							<Text fontSize={14} fontWeight={700} color="white">
								{awayInfo.name}
							</Text>
						</div>
					</section>
				</section>
				<div className="h-8pxr" />
				{/**
				 * 위치,시간 정보
				 */}
				<section className="w-full pb-12pxr flex flex-col items-center gap-4pxr">
					<Text fontSize={14} fontWeight={500} color="white">
						{placeName}
					</Text>
					<div className="flex gap-4pxr items-center">
						<Text fontSize={14} fontWeight={500} color="white">
							{date}
						</Text>
						<TagFanPool type="AWAY" />
					</div>
				</section>
			</div>
		</section>
	);
}
