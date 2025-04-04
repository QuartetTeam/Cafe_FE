// ProfileImageModal.tsx
import React from "react";

// props 타입 정의
interface ProfileImageModalProps {
  setProfileImage: (file: string) => void;  // 프로필 이미지를 설정하는 함수
  closeModal: () => void;  // 모달을 닫는 함수
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ setProfileImage, closeModal }) => {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; //파일 존재 확인
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl); // 프로필 이미니 URL 설정
      } else {
        console.error("파일이 선택되지 않았습니다.");
      }
    };
  
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <input
          type="file"
          onChange={handleFileUpload} // 파일 업로드 시 처리
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={closeModal}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          닫기
        </button>
      </div>
    );
  };

export default ProfileImageModal;