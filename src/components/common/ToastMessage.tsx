import React, { useEffect, useState } from "react";

interface ToastMessageProps {
  message: string;
  hasCheckBtn?: boolean;
  show: boolean;
  duration?: number;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  show,
  hasCheckBtn = false,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(false); // 애니메이션을 위한 상태

  useEffect(() => {
    if (show) {
      setVisible(true); // show가 true일 때 나타남
      const timer = setTimeout(() => {
        setVisible(false); // 먼저 fade-out 애니메이션 적용
        setTimeout(() => {
          onClose(); // fade-out 이후 onClose 호출
        }, 500); // fade-out 애니메이션이 500ms 뒤에 실행되도록 설정
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ display: visible ? "flex" : "none" }}
    >
      {hasCheckBtn && <span>✔️</span>}
      <span>{message}</span>
    </div>
  );
};

export default ToastMessage;
