"use client";
import { useEffect } from "react";
import ModalPortal from "./ModalPortal";
import { useModalStore } from "@/store/modalStore";
import Button from "../common/Button";
import { Text } from "../common/Text";

const ErrorModal = () => {
  const { modalProps, closeModal } = useModalStore();
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      console.log("SADF");
      if (event.key === "Enter") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
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
            <Text
              fontSize={18}
              fontWeight={700}
              color="gray700"
              className="flex flex-col"
            >
              {modalProps.confirmText}
            </Text>
          </div>
          <div className="flex justify-center">
            <Button
              text="확인"
              width="280px"
              height="50px"
              fontSize={16}
              fontWeight={700}
              borderRadius={8}
              enabledTextColor={"text-white"}
              enabledBackgroundColor={"bg-primary"}
              disabledTextColor={"text-[#5679A3]"}
              disabledBackgroundColor={"bg-primary"}
              onClick={modalProps.confirmOnClick || closeModal}
            />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ErrorModal;
