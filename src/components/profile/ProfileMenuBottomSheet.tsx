import React, { useState, useEffect } from 'react';
import BottomSheet from '../common/BottomSheet';
import { Text } from '../common/Text';
import Input from '../common/input/Input';
import { IconBlock, IconReport } from '@/public/icons';
import { useModalStore } from '@/store/modalStore';
import postUserBlock from '@/api/user/postUserBlock';

interface ProfileMenuBottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	targetUserId: string;
}

export const ProfileMenuBottomSheet = ({
	isVisible,
	onClose,
	targetUserId,
}: ProfileMenuBottomSheetProps) => {
	const { openModal } = useModalStore();

	// 차단하기 함수
	const handleBlockUser = async () => {
		try {
			const response = await postUserBlock({ targetUserId: targetUserId });
			openModal('blockUser', {
				confirmText: targetUserId,
			});
			onClose();
		} catch (error) {
			console.error('Failed to block user:', error);
			alert('차단에 실패했습니다.');
		}
	};

	// 신고하기 함수
	const handleReportUser = async () => {
		openModal('reportUser', {
			confirmText: targetUserId,
		});
		onClose();
	};

	return (
		<BottomSheet isVisible={isVisible} onClose={onClose}>
			<section className="flex flex-col gap-20pxr">
				{/* 차단하기 버튼 */}
				<div
					className="flex gap-8pxr items-center cursor-pointer"
					onClick={handleBlockUser}
				>
					<IconBlock />
					<Text fontSize={16} fontWeight={500} color="gray700">
						차단하기
					</Text>
				</div>

				{/* 신고하기 버튼 */}
				<div
					className="flex gap-8pxr items-center cursor-pointer"
					onClick={handleReportUser}
				>
					<IconReport />
					<Text fontSize={16} fontWeight={500} color="gray700">
						신고하기
					</Text>
				</div>
			</section>
		</BottomSheet>
	);
};
