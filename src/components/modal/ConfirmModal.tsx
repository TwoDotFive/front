import { Text } from '../common/Text';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';

const ConfirmModal = () => {
	const { modalProps, closeModal } = useModalStore();
	console.log('ASD');
	return (
		<ModalPortal>
			<div
				className="max-w-399pxr w-full left-1/2 -translate-x-1/2 z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="max-w-360pxr w-fit relative flex flex-col justify-center bg-white p-12pxr rounded-8pxr min-h-140pxr min-w-250pxr shadow-lg transform scale-100"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex-grow flex items-center py-20px justify-center">
						{modalProps.confirmText}
					</div>
					<div className="h-24pxr" />
					<div className="flex justify-center">
						<button
							onClick={modalProps.confirmOnClick || closeModal}
							className="px-16pxr py-8pxr w-full bg-primary text-white rounded hover:brightness-75"
						>
							확인
						</button>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default ConfirmModal;
