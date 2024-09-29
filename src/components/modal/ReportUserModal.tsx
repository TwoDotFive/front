import React, { useState } from 'react';
import { Text } from '../common/Text';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';
import postUserReport from '@/api/user/postUserReport';
import { IconReportOrange } from '@/public/icons';
import { useRouter } from 'next/navigation';

const ReportUserModal = () => {
	const { modalProps, closeModal, openModal } = useModalStore();
	const [reportContent, setReportContent] = useState('');
	const router = useRouter();
	const handleReportUser = async () => {
		if (modalProps.confirmText && reportContent.trim()) {
			try {
				await postUserReport({
					targetUserId: modalProps.confirmText.toString(),
					content: reportContent,
				});
				openModal('confirm', {
					confirmText: (
						<div className="flex flex-col items-center gap-8pxr">
							<IconReportOrange />
							<Text fontSize={18} fontWeight={700} color="gray700">
								사용자가 신고되었습니다.
							</Text>
							<Text
								fontSize={16}
								fontWeight={500}
								color="gray700"
								className="opacity-60 text-center"
							>
								신고 내용은 팬풀 운영팀으로 접수되어, 팬풀 이용약관 및 정책에
								의해서 처리됩니다
							</Text>
						</div>
					),
					confirmOnClick() {
						router.back();
					},
				});
			} catch (error) {
				alert('신고가 실패했습니다.');
				console.error('Error reporting user:', error);
			}
		} else {
			alert('신고 내용을 입력해주세요.');
		}
	};

	return (
		<ModalPortal>
			<div
				className="max-w-399pxr w-full left-1/2 -translate-x-1/2  z-[9999] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
				onClick={closeModal}
			>
				<div
					className="max-w-380pxr w-fit relative flex flex-col justify-center bg-white p-24pxr rounded-20pxr min-h-140pxr shadow-lg transform scale-100"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex flex-col">
						<Text fontSize={18} fontWeight={700} color="gray700">
							사용자를 신고하는 이유를 직접 작성해주세요
						</Text>
						<div className="h-4pxr" />
						<Text fontSize={14} fontWeight={500} color="gray700">
							신고된 사용자는 자동으로 차단처리됩니다.
						</Text>
					</div>

					<div className="h-24pxr" />
					<textarea
						value={reportContent}
						onChange={(e) => setReportContent(e.target.value)}
						placeholder="신고 내용을 입력해주세요. (최대 300자)"
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
							onClick={handleReportUser}
							className="w-full px-16pxr py-8pxr bg-primary text-white rounded-8pxr hover:brightness-75"
						>
							신고하기
						</button>
					</div>
				</div>
			</div>
		</ModalPortal>
	);
};

export default ReportUserModal;
