import React from 'react';
import { Text } from '../common/Text';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';

const DeleteFanpoolModal = () => {
	const { modalProps, closeModal } = useModalStore();

	return (
		<ModalPortal>
			<div
				className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="relative flex flex-col justify-center bg-white py-24pxr rounded-20pxr min-h-140pxr min-w-320pxr shadow-lg transform scale-100 gap-24pxr"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex items-center justify-center">
						{modalProps.confirmText}
					</div>
					<div className="flex justify-between gap-4 px-4">
						<button
							onClick={closeModal}
							className="w-full px-14pxr py-11pxr bg-gray-300 text-black rounded-8pxr hover:brightness-90"
						>
							취소
						</button>
						<button
							onClick={modalProps.confirmOnClick}
							className="w-full px-14pxr py-11pxr bg-primary text-white rounded-8pxr hover:brightness-75"
						>
							삭제
						</button>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default DeleteFanpoolModal;
