import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Tags } from '@/constants/tags';
import { TagFanPool } from '../tag/TagFanPool';
import { Text } from '../Text';

export default function FanpoolCard() {
	const image = '';
	const fanpoolType: Tags[] = ['CAR_SHARE'];
	const title = '야구팬이면 같이 타요~';
	const game = {
		id: 111,
		awayTeam: {
			id: 2,
			name: '키움 히어로즈',
			representativeImageUrl: 'https://example.com/kiwoom.png',
			stadiumName: '구로 고척 스카이돔',
			stadiumAliasName: '고척',
		},
		homeTeam: {
			id: 1,
			name: '삼성 라이온즈',
			representativeImageUrl: 'https://example.com/samsung.png',
			stadiumName: '수원 위즈 파크',
			stadiumAliasName: '수원',
		},
		startDate: '2024-09-01T15:00:00',
		stadium: '수원 위즈 파크',
	};
	const departAt = '2024-08-20T10:00:00';
	const departFrom = {
		fullText: '서울 종로구 광화문광장로 123',
		zipNo: '12345',
		sido: '서울',
		sigungu: '종로구',
		dong: '대한동',
		dongCd: '12345678',
		x: '127.0331234',
		y: '37.523427',
	};
	const numberOfPeople = 4;

	const formattedDepartAt = format(new Date(departAt), 'MM.dd(EEE) HH:mm', {
		locale: ko,
	});

	const stadiumShort = game.stadium.split(' ')[0];

	const awayTeamShort = game.awayTeam.name.split(' ')[0];
	const homeTeamShort = game.homeTeam.name.split(' ')[0];

	return (
		<section className="w-full h-104pxr flex gap-12pxr cursor-pointer">
			<div className="w-82pxr h-full">
				{!image ? (
					<div className="w-full h-full bg-gray100 rounded-9pxr"></div>
				) : (
					<div></div>
				)}
			</div>
			<div className="flex flex-col justify-between py-8pxr">
				{fanpoolType.map((type) => (
					<TagFanPool key={type} type={type} />
				))}
				<Text fontSize={16} fontWeight={600}>
					{title}
				</Text>
				<Text fontSize={12} fontWeight={400}>
					{formattedDepartAt} {stadiumShort} | {awayTeamShort} VS{' '}
					{homeTeamShort}
				</Text>
				<Text fontSize={12} fontWeight={400}>
					{departFrom.sigungu} 출발, {numberOfPeople}명 모집
				</Text>
			</div>
		</section>
	);
}
