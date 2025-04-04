import React from "react";
import { useRouter } from "next/navigation";

// props 타입 정의
interface ProfileImageModalProps {
  setProfileImage: (file: string) => void;  // 프로필 이미지를 설정하는 함수
  closeModal: () => void;  // 모달을 닫는 함수
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ setProfileImage, closeModal }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const defaultProfileImage = "/default-profile.png"; // 기본 이미지 경로
    const router = useRouter();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; //파일 존재 확인
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        localStorage.setItem("profileImage", imageUrl); // localStorage에 저장
        setProfileImage(imageUrl); // 상태에도 반영
        closeModal(); // 모달 닫기
        router.push("/mypage-owner"); // 계정 관리 페이지로 이동
      } else {
        console.error("파일이 선택되지 않았습니다.");
      }
    };

    const triggerFileSelect = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleDelete = () => {
      setProfileImage(defaultProfileImage);
      closeModal();
    };

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-80 p-6 text-center">
          <h2 className="text-lg font-bold text-black mb-4">프로필 사진 바꾸기</h2>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={triggerFileSelect}
            className="w-full text-blue-600 py-2 hover:font-semibold"
          >
            사진 업로드
          </button>

          <button
            onClick={handleDelete}
            className="w-full text-red-600 py-2 hover:font-semibold"
          >
            현재 사진 삭제
          </button>

          <button
            onClick={closeModal}
            className="w-full text-gray-700 py-2 hover:font-semibold"
          >
            취소
          </button>
        </div>
      </div>
    );
  };

export default ProfileImageModal;