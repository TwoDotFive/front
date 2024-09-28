import React from 'react';
import { Text } from '../common/Text';
import { TagFanPool } from '../common/tag/TagFanPool';
import { Tags } from '@/constants/tags';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../register/useKakaoLoader';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import SelectHighlightButton from '../common/button/SelectHighlightButton';
import { FanpoolInformation } from '@/types/types';

interface FanpoolDetailProps {
	fanpoolInformation: FanpoolInformation;
}

const FanpoolDetail = ({ fanpoolInformation }: FanpoolDetailProps) => {
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
				{fanpoolInformation.title}
			</Text>
			<div className="h-4pxr" />

			<Text fontSize={16} fontWeight={400} color="gray700">
				{'설명'}
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
					lat: Number(x),
					lng: Number(y),
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
					text={fanpoolInformation.fanpoolTypeKor}
					isSelected={true}
					onClick={() => {}}
				/>
			</div>
			<div className="h-8pxr" />
			<div className="flex gap-8pxr">
				<TagFanPool type={fanpoolInformation.genderConstraint as Tags} />
				<Text fontSize={16} fontWeight={400} color="gray700">
					{fanpoolInformation.numberOfPeople -
						fanpoolInformation.currentNumberOfPeople}
					명 모집 ({fanpoolInformation.currentNumberOfPeople}/
					{fanpoolInformation.numberOfPeople})
				</Text>
			</div>
			<div className="h-54pxr" />
		</section>
	);
};

export default FanpoolDetail;
