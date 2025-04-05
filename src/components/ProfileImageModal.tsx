import React from "react";
import { useRouter } from "next/navigation";

// props 타입 정의
interface ProfileImageModalProps {
  setProfileImage: (url: string) => void;
  closeModal: () => void;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ setProfileImage, closeModal }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
        closeModal();
        router.push("/mypage-member1");
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
      const defaultProfileImage = "/default-profile.png";
      localStorage.setItem("profileImage", defaultProfileImage);
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