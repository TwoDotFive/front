import React from 'react';
import { Text } from '../common/Text';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';

const ConfirmUserModal = () => {
	const { modalProps, closeModal } = useModalStore();

	return (
		<ModalPortal>
			<div
				className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="relative flex flex-col justify-center bg-white p-12pxr rounded-8pxr min-h-140pxr min-w-250pxr shadow-lg transform scale-100"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex-grow flex items-center py-20px justify-center">
						<Text fontSize={18} fontWeight={700} color="gray700">
							{modalProps.confirmText}
						</Text>
					</div>
					<div className="flex justify-between gap-4 px-4">
						<button
							onClick={closeModal}
							className="w-full px-16pxr py-8pxr bg-gray-300 text-black rounded hover:brightness-90"
						>
							취소
						</button>
						<button
							onClick={modalProps.confirmOnClick}
							className="w-full px-16pxr py-8pxr bg-primary text-white rounded hover:brightness-75"
						>
							확인
						</button>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default ConfirmUserModal;
