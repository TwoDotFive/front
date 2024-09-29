import React from 'react';
import { Text } from '../common/Text';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';
import { IconBlockRed } from '@/public/icons';
import deleteUserBlock from '@/api/user/deleteUserBlock';

const BlockUserModal = () => {
	const { modalProps, closeModal } = useModalStore();

	const handleDeleteBlock = async () => {
		if (modalProps.confirmText) {
			try {
				await deleteUserBlock({
					targetUserId: modalProps.confirmText.toString(),
				});
				alert('차단이 해제되었습니다.');
				closeModal();
			} catch (error) {
				console.error('차단 해제 실패:', error);
				alert('차단 해제에 실패했습니다.');
			}
		}
	};

	return (
		<ModalPortal>
			<div
				className="max-w-399pxr w-full left-1/2 -translate-x-1/2  z-[9999] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="max-w-320pxr px-20pxr relative flex flex-col justify-center bg-white p-24pxr rounded-20pxr min-h-140pxr shadow-lg transform scale-100"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex flex-col items-center justify-center">
						<IconBlockRed />
						<div className="h-8pxr" />
						<Text fontSize={18} fontWeight={700} color="gray800">
							해당 사용자를 차단했어요
						</Text>
						<div className="h-8pxr" />
						<Text
							fontSize={14}
							fontWeight={400}
							color="gray700"
							className="text-center"
						>
							더 이상 해당 사용자가 올린 게시글과 팬풀은 보이지 않아요. 차단은
							앱 설정에서 해제할 수 있어요.
						</Text>
					</div>
					<div className="h-24pxr" />
					<div className="flex justify-between gap-8pxr">
						<button
							onClick={handleDeleteBlock}
							className="w-full h-50pxr px-16pxr py-8pxr bg-gray100 text-black rounded-8pxr hover:brightness-90"
						>
							<Text fontSize={16} fontWeight={500} color="gray700">
								실행취소
							</Text>
						</button>
						<button
							onClick={closeModal}
							className="w-full px-16pxr py-8pxr bg-primary text-white rounded-8pxr hover:brightness-75"
						>
							확인
						</button>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default BlockUserModal;
