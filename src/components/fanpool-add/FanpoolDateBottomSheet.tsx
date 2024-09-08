import React, { useState, useEffect, useRef } from 'react';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';

interface FanpoolDateBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	onDateSelect: (date: Date) => void;
}

const years = Array.from(
	{ length: 101 },
	(_, i) => new Date().getFullYear() - 50 + i
); // 현재 년도를 기준으로 +/- 50년
const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1월 ~ 12월
const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1일 ~ 31일

const FanpoolDateBottomSheet: React.FC<FanpoolDateBottomSheetProps> = ({
	isVisible,
	onClose,
	onDateSelect,
}) => {
	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<div className="px-8">
				<Text fontSize={16} fontWeight={700} color="gray700">
					팬풀 날짜
				</Text>
			</div>
		</BottomSheet>
	);
};

export default FanpoolDateBottomSheet;
