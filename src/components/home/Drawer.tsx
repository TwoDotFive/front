'use client';
import React, { useEffect } from 'react';
import { Text } from '@/components/common/Text';
import { IconClose } from '@/public/icons';

interface DrawerProps {
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
	isVisible,
	onClose,
	children,
}) => {
	const drawerClasses = isVisible ? 'translate-x-0' : '-translate-x-full';
	const overlayClasses = isVisible
		? 'opacity-50 pointer-events-auto'
		: 'opacity-0 pointer-events-none';

	useEffect(() => {
		if (isVisible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
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
				<div className="flex-1 overflow-y-auto p-4">{children}</div>
			</div>
		</>
	);
};

export default Drawer;
