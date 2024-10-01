'use client';

import { useModalStore } from '@/store/modalStore';
import ConfirmModal from '@/components/modal/ConfirmModal';
import ErrorModal from '@/components/modal/ErrorModal';
import ConfirmUserModal from '@/components/modal/ConfirmUserModal';
import BlockUserModal from '@/components/modal/BlockUserModal';
import ReportUserModal from '@/components/modal/ReportUserModal';
import DeleteFanpoolModal from '@/components/modal/DeleteFanpoolModal';

export default function ClientModals() {
	const { isOpen, modalType } = useModalStore();

	return (
		<div id="modal">
			{isOpen && modalType === '' && <ConfirmModal />}
			{isOpen && modalType === 'error' && <ErrorModal />}
			{isOpen && modalType === 'confirm' && <ConfirmModal />}
			{isOpen && modalType === 'confirmUser' && <ConfirmUserModal />}
			{isOpen && modalType === 'deleteFanpool' && <DeleteFanpoolModal />}
			{isOpen && modalType === 'blockUser' && <BlockUserModal />}
			{isOpen && modalType === 'reportUser' && <ReportUserModal />}
		</div>
	);
}
