'use client';
import { ModalType } from '@/constants/modalType';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
	isOpen: boolean;
	modalType: ModalType;
	modalProps: {
		confirmText?: ReactNode;
		confirmOnClick?: () => void;
	};
	openModal: (type: ModalType, props: ModalState['modalProps']) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	modalType: '',
	modalProps: {},
	openModal: (type, props) =>
		set({ isOpen: true, modalType: type, modalProps: props }),
	closeModal: () => set({ isOpen: false, modalType: '', modalProps: {} }),
}));
