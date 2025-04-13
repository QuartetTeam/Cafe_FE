import { useState } from "react";
import Image from "next/image";

interface ProfileUpdateFormProps {
  profileImage: File | string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | string | null>>;
  openModal: () => void;
}

// ProfileUpdateForm.tsx
const ProfileUpdateForm = ({
  profileImage,
  setProfileImage,
  openModal,
}: ProfileUpdateFormProps): JSX.Element => {
  const [imageError, setImageError] = useState(false);

  return (
    <form className="flex flex-col space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-10">
      <div className="flex justify-start">
        <div className="flex items-end gap-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {profileImage && !imageError ? (
              <Image
                src={typeof profileImage === "string" ? profileImage : URL.createObjectURL(profileImage)}
                alt="프로필 이미지"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : imageError ? (
              <span className="text-sm text-center text-black">이미지 업로드 실패</span>
            ) : (
              <span className="text-3xl text-black">+</span>
            )}
          </div>
          <button
            type="button"
            onClick={openModal}
            className="bg-[#a66a2d] text-white px-3 py-1 rounded-full text-sm"
          >
            변경
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileUpdateForm;