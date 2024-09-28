'use client';
import React, { useEffect } from 'react';
import { Text } from '@/components/common/Text';
import { IconClose } from '@/public/icons';
import UserProfile from './UserProfile';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/modalStore'; // Import the modal store

interface DrawerProps {
	isVisible: boolean;
	onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isVisible, onClose }) => {
	const router = useRouter();
	const { openModal, closeModal } = useModalStore(); // Destructure modal methods
	const drawerClasses = isVisible ? 'translate-x-0' : '-translate-x-full';
	const overlayClasses = isVisible
		? 'opacity-50 pointer-events-auto'
		: 'opacity-0 pointer-events-none';

	const handleLogout = () => {
		// Remove userId from localStorage
		localStorage.removeItem('userId');

		// Close the modal and redirect to the home page
		closeModal();
		router.push('/');
	};

	const openLogoutConfirmModal = () => {
		openModal('confirmUser', {
			confirmText: '현재 게정에서 로그아웃할까요?',
			confirmOnClick: handleLogout,
		});
	};

	useEffect(() => {
		const scrollContentsElement = document.querySelector('.scroll-contents');

		if (isVisible) {
			document.body.style.overflow = 'hidden';
			if (scrollContentsElement) {
				scrollContentsElement.classList.remove('scroll-contents');
			}
		} else {
			document.body.style.overflow = '';
			if (scrollContentsElement) {
				scrollContentsElement.classList.add('scroll-contents');
			}
		}

		return () => {
			document.body.style.overflow = '';
			if (scrollContentsElement) {
				scrollContentsElement.classList.add('scroll-contents');
			}
		};
	}, [isVisible]);

	return (
		<>
			<div
				className={`absolute inset-0 h-screen z-[998] bg-black transition-opacity duration-300 ease-in-out ${overlayClasses}`}
				onClick={onClose}
			/>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`absolute top-0 bottom-0 left-0 z-[999] flex h-screen w-[70%] max-w-sm flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${drawerClasses}`}
			>
				<div className="relative flex w-full flex-col p-20pxr">
					<div className="flex justify-between items-center">
						<div onClick={onClose} className="cursor-pointer">
							<IconClose width={24} height={24} />
						</div>
					</div>
				</div>
				<div className="flex-1 overflow-y-auto px-20pxr">
					<UserProfile
						name={'네임드호빵'}
						fanpoolCount={3}
						fanpoolLogCount={4}
					/>
					<div className="h-24pxr" />
					<div className="flex flex-col gap-18pxr">
						<Text fontSize={14} fontWeight={400} className="cursor-pointer">
							나의 관심 팬풀
						</Text>
						<Text fontSize={14} fontWeight={400} className="cursor-pointer">
							설정
						</Text>
						<Text fontSize={14} fontWeight={400} className="cursor-pointer">
							서비스 약관
						</Text>
						<Text
							fontSize={14}
							fontWeight={400}
							className="cursor-pointer"
							onClick={openLogoutConfirmModal} // Open the logout confirmation modal
						>
							로그아웃
						</Text>
						<Text fontSize={14} fontWeight={400} className="cursor-pointer">
							회원탈퇴
						</Text>
					</div>
				</div>
			</div>
		</>
	);
};

export default Drawer;
