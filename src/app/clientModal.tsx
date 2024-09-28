'use client';

import { useModalStore } from '@/store/modalStore';
import ConfirmModal from '@/components/modal/ConfirmModal';
import ErrorModal from '@/components/modal/ErrorModal';
import ConfirmUserModal from '@/components/modal/ConfirmUserModal';

export default function ClientModals() {
	const { isOpen, modalType } = useModalStore();

	return (
		<div id="modal">
			{isOpen && modalType === '' && <ConfirmModal />}
			{isOpen && modalType === 'error' && <ErrorModal />}
			{isOpen && modalType === 'confirmUser' && <ConfirmUserModal />}
		</div>
	);
}
