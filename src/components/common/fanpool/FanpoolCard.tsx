import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Tags } from '@/constants/tags';
import { TagFanPool } from '../tag/TagFanPool';
import { Text } from '../Text';

interface FanpoolCardProps {
	fanpool:
		| {
				id: number;
				title: string;
				fanpoolType: string;
				departAt: string;
				game: {
					awayTeam: {
						name: string;
						representativeImageUrl: string;
					};
					homeTeam: {
						name: string;
						representativeImageUrl: string;
					};
					stadium: string;
					startDate: string;
				};
				departFrom: {
					fullText: string;
					sigungu: string;
				};
				numberOfPeople: number;
		  }
		| undefined; // fanpool이 undefined일 가능성도 처리
}

export default function FanpoolCard({ fanpool }: FanpoolCardProps) {
	// fanpool이 존재하지 않으면 null을 반환해 컴포넌트 렌더링을 중단
	if (!fanpool) {
		return null;
	}

	const formattedDepartAt = format(
		new Date(fanpool.departAt),
		'MM.dd(EEE) HH:mm',
		{
			locale: ko,
		}
	);

	const stadiumShort = fanpool.game.stadium.split(' ')[0];
	const awayTeamShort = fanpool.game.awayTeam.name.split(' ')[0];
	const homeTeamShort = fanpool.game.homeTeam.name.split(' ')[0];

	return (
		<section className="w-full h-104pxr flex gap-12pxr cursor-pointer">
			<div className="w-82pxr h-full">
				{!fanpool.game.awayTeam.representativeImageUrl ? (
					<div className="w-full h-full bg-gray100 rounded-9pxr"></div>
				) : (
					<img
						src={fanpool.game.awayTeam.representativeImageUrl}
						alt={`${fanpool.game.awayTeam.name} 이미지`}
						className="w-full h-full rounded-9pxr object-cover"
					/>
				)}
			</div>
			<div className="flex flex-col justify-between py-8pxr">
				<TagFanPool type={fanpool.fanpoolType as Tags} />
				<Text fontSize={16} fontWeight={600}>
					{fanpool.title}
				</Text>
				<Text fontSize={12} fontWeight={400}>
					{formattedDepartAt} {stadiumShort} | {awayTeamShort} VS{' '}
					{homeTeamShort}
				</Text>
				<Text fontSize={12} fontWeight={400}>
					{fanpool.departFrom.sigungu} 출발, {fanpool.numberOfPeople}명 모집
				</Text>
			</div>
		</section>
	);
}
