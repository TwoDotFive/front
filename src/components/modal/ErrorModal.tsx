import { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';

const ErrorModal = () => {
  const { modalProps, closeModal } = useModalStore();
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      console.log('SADF');
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
            <div className="flex flex-col">{modalProps.confirmText}</div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={modalProps.confirmOnClick || closeModal}
              className="bg-cctvStrongRed w-full rounded px-16pxr py-8pxr text-white hover:brightness-75"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ErrorModal;
