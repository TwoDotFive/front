import React from 'react';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';
import { Tags } from '@/constants/tags';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../register/useKakaoLoader';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import SelectHighlightButton from '../common/button/SelectHighlightButton';

interface FanpoolDetailProps {
	fanpoolInformation: {
		id: number;
		hostUserId: number;
		game: {
			id: number;
			awayTeam: {
				id: number;
				name: string;
				representativeImageUrl: string;
				stadiumName: string;
				stadiumAliasName: string;
			};
			homeTeam: {
				id: number;
				name: string;
				representativeImageUrl: string;
				stadiumName: string;
				stadiumAliasName: string;
			};
			startDate: string;
			stadium: string;
		};
		departAt: string;
		departFrom: {
			fullText: string;
			zipNo: string;
			sido: string;
			sigungu: string;
			dong: string;
			dongCd: string;
			x: string;
			y: string;
		};
		fanpoolType: string;
		fanpoolTypeKor: string;
		genderConstraint: string;
		numberOfPeople: number;
		currentNumberOfPeople: number;
	};
}

const FanpoolDetail: React.FC<FanpoolDetailProps> = ({
	fanpoolInformation,
}) => {
	useKakaoLoader();
	const { x, y } = fanpoolInformation.departFrom;

	const formattedDate = format(
		new Date(fanpoolInformation.departAt),
		'MM/dd (EEE) a h:mm',
		{ locale: ko }
	);

	return (
		<section>
			<div className="flex gap-6pxr">
				<TagFanPool type={fanpoolInformation.fanpoolType as Tags} />
				<TagFanPool type={fanpoolInformation.genderConstraint as Tags} />
			</div>
			<div className="h-12pxr" />
			<Text fontSize={18} fontWeight={700} color="gray700">
				야구팬이면 같이타요~
			</Text>
			<div className="h-4pxr" />

			<Text fontSize={16} fontWeight={400} color="gray700">
				만남 장소 근처라면 조율됩니다! 돌아올 때도 같은 곳이라면 같이 돌아가요!
				채팅 주세요~ 들를 장소 추천 받아요
			</Text>
			<div className="h-40pxr" />
			<Text fontSize={16} fontWeight={700} color="gray700">
				출발 장소
			</Text>
			<div className="h-8pxr" />
			<Text fontSize={16} fontWeight={400} color="gray700">
				{fanpoolInformation.departFrom.fullText}
			</Text>
			<div className="h-8pxr" />

			<Map
				center={{
					lat: Number(y),
					lng: Number(x),
				}}
				style={{ width: '100%', height: '129px' }}
				level={3}
				draggable={false}
				scrollwheel={false}
				zoomable={false}
			></Map>

			<div className="h-40pxr" />
			<Text fontSize={16} fontWeight={700} color="gray700">
				출발 시간
			</Text>
			<div className="h-8pxr" />
			<Text fontSize={16} fontWeight={400} color="gray700">
				{formattedDate}
			</Text>
			<div className="h-40pxr" />
			<Text fontSize={16} fontWeight={700} color="gray700">
				가는 방법
			</Text>
			<div className="h-8pxr" />
			<div className="w-1/2">
				<SelectHighlightButton
					text="차량공유"
					isSelected={true}
					onClick={() => {}}
				/>
			</div>
			<div className="h-8pxr" />
			<TagFanPool type={fanpoolInformation.genderConstraint as Tags} />
			<div className="h-8pxr" />
			<Text fontSize={16} fontWeight={400} color="gray700">
				{fanpoolInformation.numberOfPeople -
					fanpoolInformation.currentNumberOfPeople}
				명 모집 ({fanpoolInformation.currentNumberOfPeople}/
				{fanpoolInformation.numberOfPeople})
			</Text>
			<div className="h-54pxr" />
		</section>
	);
};

export default FanpoolDetail;
