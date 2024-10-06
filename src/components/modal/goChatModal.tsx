import React, { useState } from 'react';
import { Text } from '../common/Text';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';
import { useRouter } from 'next/navigation';

const GoChatModal = () => {
	const { modalProps, closeModal, openModal } = useModalStore();
	const [chatContent, setChatContent] = useState('');
	const router = useRouter();
	const handleChatStart = async () => {
		if (modalProps.confirmOnClick && chatContent.trim()) {
			try {
				await modalProps.confirmOnClick(chatContent.trim());
				openModal('confirm', {
					confirmText: (
						<div className="flex flex-col items-center">
							<Text fontSize={18} fontWeight={700} color="gray700">
								채팅을 보냈습니다.
							</Text>
						</div>
					),
					confirmOnClick() {
						closeModal();
						router.push('/chat');
					},
				});
			} catch (error) {
				alert('채팅 전송에 실패했습니다.');
				console.error('Error reporting user:', error);
			}
		} else {
			alert('채팅 내용을 입력해주세요.');
		}
	};

	return (
		<ModalPortal>
			<div
				className="max-w-399pxr w-full left-1/2 -translate-x-1/2  z-[9999] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="max-w-380pxr min-w-300pxr w-fit relative flex flex-col justify-center bg-white p-24pxr rounded-20pxr min-h-140pxr shadow-lg transform scale-100"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex flex-col">
						<Text fontSize={18} fontWeight={700} color="gray700">
							채팅보내기
						</Text>
					</div>

					<div className="h-24pxr" />
					<textarea
						value={chatContent}
						onChange={(e) => setChatContent(e.target.value)}
						placeholder="채팅 내용을 입력해주세요. (최대 300자)"
						className="w-full h-100pxr p-12pxr rounded-8pxr bg-gray050 placeholder:text-gray400 text-sm resize-none"
					/>

					<div className="h-24pxr" />
					<div className="flex justify-between gap-8pxr">
						<button
							onClick={closeModal}
							className="w-full h-50pxr px-16pxr py-8pxr bg-gray100 text-black rounded-8pxr hover:brightness-90"
						>
							<Text fontSize={16} fontWeight={500} color="gray700">
								취소
							</Text>
						</button>
						<button
							onClick={handleChatStart}
							className="w-full px-16pxr py-8pxr bg-primary text-white rounded-8pxr hover:brightness-75"
						>
							전송
						</button>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default GoChatModal;
