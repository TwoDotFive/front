'use client';
import { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';
import Button from '../common/Button';
import { Text } from '../common/Text';

const ErrorModal = () => {
	const { modalProps, closeModal } = useModalStore();

	// 중간 핸들러 함수로 이벤트 전달을 막고, modalProps.confirmOnClick 호출
	const handleConfirmClick = () => {
		if (modalProps.confirmOnClick) {
			modalProps.confirmOnClick(); // 이벤트 객체를 전달하지 않고 confirmOnClick 호출
		} else {
			closeModal();
		}
	};

	useEffect(() => {
		const handleKeyPress = (event: any) => {
			if (event.key === 'Enter') {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return (
		<ModalPortal>
			<div
				className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="relative flex min-h-110pxr min-w-250pxr scale-100 transform flex-col justify-center rounded-8pxr bg-white p-12pxr shadow-lg"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex flex-grow items-center justify-center py-20pxr text-center">
						<Text
							fontSize={18}
							fontWeight={700}
							color="gray700"
							className="flex flex-col"
						>
							{modalProps.confirmText}
						</Text>
					</div>
					<div className="flex justify-center">
						<Button
							text="확인"
							width="280px"
							height="50px"
							fontSize={16}
							fontWeight={700}
							borderRadius={8}
							enabledTextColor={'text-white'}
							enabledBackgroundColor={'bg-primary'}
							disabledTextColor={'text-[#5679A3]'}
							disabledBackgroundColor={'bg-primary'}
							onClick={handleConfirmClick} // 수정된 부분
						/>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default ErrorModal;
