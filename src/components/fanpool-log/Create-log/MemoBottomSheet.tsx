"use client";
import React, { useEffect, useState } from "react";
import { Text } from "@/components/common/Text";
import BottomSheet from "@/components/common/BottomSheet";
import { IconUpload, IconClose } from "@/public/icons";
import { Memo } from "@/store/fanpool-log/store";
import {
  getPresignedUrl,
  uploadImageToS3,
} from "@/api/fanpool-log/create-log/step3";

interface MemoBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  isEditMode: boolean;
  onSave: (memo: Memo) => void; // 메모 저장 함수
  onDelete: () => void;
  initialMemo?: string;
  initialImages?: string[];
}

export const MemoBottomSheet: React.FC<MemoBottomSheetProps> = ({
  isVisible,
  onClose,
  isEditMode,
  onSave,
  onDelete,
  initialMemo = "",
  initialImages = [],
}) => {
  const [memo, setMemo] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (isEditMode && isVisible) {
      setMemo(initialMemo);
      setImagePreviews(initialImages || []);
      setImages([]); // 이미 업로드된 이미지는 images에서 제외 (업로드된 이미지들은 따로 관리됨)
    }
  }, [isEditMode, isVisible, initialMemo, initialImages]);

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFiles = Array.from(event.target.files);
      const newImagePreviews = uploadedFiles.map((file) => {
        return URL.createObjectURL(file);
      });

      setImages((prevImages) => {
        // 중복되지 않도록 새 이미지 파일 추가
        const newFiles = uploadedFiles.filter(
          (file) => !prevImages.some((img) => img.name === file.name)
        );
        return [...prevImages, ...newFiles].slice(0, 4);
      });

      setImagePreviews((prevImages) =>
        [
          ...prevImages.filter((img) => !newImagePreviews.includes(img)),
          ...newImagePreviews,
        ].slice(0, 4)
      ); // 최대 4개의 이미지만 허용
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleMemoSave = async () => {
    const uploadedImageUrls: { sequence: number; url: string }[] = [];

    // imagePreviews 중 blob URL이 아닌 이미지는 그대로 유지
    imagePreviews.forEach((preview, index) => {
      if (!preview.startsWith("blob")) {
        uploadedImageUrls.push({
          sequence: index + 1,
          url: preview,
        });
      }
    });

    // 새로 추가된 이미지들 업로드
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image instanceof File) {
        const presignedUrl = await getPresignedUrl();

        await uploadImageToS3(presignedUrl.toString(), image);
        const imageUrl = presignedUrl.toString().split("?")[0];

        uploadedImageUrls.push({
          sequence: uploadedImageUrls.length + 1,
          url: imageUrl,
        });
      }
    }

    onSave({
      content: memo,
      images: uploadedImageUrls,
    });
    onClose();
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col gap-12pxr">
        {/* 바텀시트 상단 헤더 */}
        <div className="flex justify-between items-center mb-12pxr">
          <div className="flex justify-start items-center gap-12pxr">
            <button onClick={onClose}>
              <IconClose />
            </button>
            <Text fontSize={18} fontWeight={700} color="gray800">
              메모
            </Text>
          </div>
          <div className="flex justify-end items-center gap-12pxr">
            {isEditMode && (
              <button onClick={onDelete}>
                <Text fontSize={14} fontWeight={500} color="gray600">
                  삭제
                </Text>
              </button>
            )}
            <button onClick={handleMemoSave}>
              <Text fontSize={14} fontWeight={500} color="kboBlue500">
                완료
              </Text>
            </button>
          </div>
        </div>

        {/* 이미지 추가 */}
        <div className="flex flex-wrap items-center gap-12pxr">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative w-60pxr h-60pxr">
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-0 right-0 bg-white rounded-full p-1"
              >
                <IconClose />
              </button>
              <img
                className="w-full h-full object-cover rounded-lg"
                src={preview}
                alt={`추가된 이미지 ${index}`}
              />
            </div>
          ))}
          {imagePreviews.length < 4 && (
            <label className="w-70pxr h-70pxr rounded-4pxr border-1 bg-gray050 border-gray050 flex items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <IconUpload />
            </label>
          )}
        </div>

        {/* 메모 입력 */}
        <textarea
          className="w-full p-10pxr h-100pxr border rounded-lg border-gray300"
          placeholder="메모를 입력하세요"
          value={memo}
          onChange={handleMemoChange}
          maxLength={500}
        />

        {/* 메모 길이 표시 */}
        <div className="flex justify-end">
          <Text fontSize={14} fontWeight={400} color="gray600">
            {memo.length}/500
          </Text>
        </div>
      </div>
    </BottomSheet>
  );
};
