import React, { useState, useEffect } from 'react';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';
import { IconPencil, IconReport, IconTrashCan } from '@/public/icons';
import { useModalStore } from '@/store/modalStore';

interface FanpoolDetailBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	fanpoolId: string;
}

export const FanpoolDetailBottomSheet = ({
	isVisible,
	onClose,
	fanpoolId,
}: FanpoolDetailBottomSheetProps) => {
	const { openModal } = useModalStore();

	const deleteFanpool = async () => {
		// const response =
	};
	const handleDeleteFanpool = async () => {
		openModal('deleteFanpool', {
			confirmText: (
				<Text fontSize={18} fontWeight={700} color="kboNavy">
					팬풀 모집글을 삭제할까요?
				</Text>
			),
			confirmOnClick() {
				deleteFanpool();
			},
		});
		onClose();
	};
	const handleReportUser = async () => {
		openModal('reportUser', {
			confirmText: fanpoolId,
		});
		onClose();
	};

	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<section className="flex flex-col gap-20pxr">
				{/* 수정하기 */}
				<div
					className="flex gap-8pxr items-center cursor-pointer"
					onClick={() => {}}
				>
					<IconPencil />
					<Text fontSize={16} fontWeight={500} color="gray700">
						수정하기
					</Text>
				</div>

				{/* 삭제하기 */}
				<div
					className="flex gap-8pxr items-center cursor-pointer"
					onClick={handleDeleteFanpool}
				>
					<IconTrashCan />
					<Text fontSize={16} fontWeight={500} color="gray700">
						삭제하기
					</Text>
				</div>
			</section>
		</BottomSheet>
	);
};
