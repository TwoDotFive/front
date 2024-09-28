'use client';
import React, { useEffect } from 'react';

interface BottomSheetProps {
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const BottomSheet = ({
	isVisible,
	onClose,
	children,
}: BottomSheetProps) => {
	const bottomSheetClasses = isVisible
		? 'translate-y-0 -translate-x-1/2'
		: 'translate-y-full -translate-x-1/2';
	const overlayClasses = isVisible
		? 'opacity-50 pointer-events-auto'
		: 'opacity-0 pointer-events-none';

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
				className={`max-w-399pxr w-full left-1/2 -translate-x-1/2 fixed inset-0 z-[998] bg-black transition-opacity duration-300 ease-in-out ${overlayClasses}`}
				onClick={onClose}
			/>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`max-w-399pxr left-1/2 fixed bottom-0 z-[999] w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${bottomSheetClasses} py-20pxr rounded-t-12pxr`}
			>
				<div className="flex-1 overflow-y-auto px-20pxr">{children}</div>
			</div>
		</>
	);
};

export default BottomSheet;
