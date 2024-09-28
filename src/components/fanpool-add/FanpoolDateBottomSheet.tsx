import React, { useState, useEffect, useRef } from 'react';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';

interface FanpoolDateBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	onDateSelect: (date: Date) => void;
}

export const FanpoolDateBottomSheet = ({
	isVisible,
	onClose,
	onDateSelect,
}: FanpoolDateBottomSheetProps) => {
	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<div className="-px-8pxr">
				<Text fontSize={16} fontWeight={700} color="gray700">
					팬풀 날짜
				</Text>
			</div>
		</BottomSheet>
	);
};
