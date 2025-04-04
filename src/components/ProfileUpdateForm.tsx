import { useState } from "react";

interface ProfileUpdateFormProps {
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

// ProfileUpdateForm.tsx
export default function ProfileUpdateForm({
  setProfileImage,
}: ProfileUpdateFormProps) {
  return (
      <form className="flex flex-col space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-10">
        <div className="flex justify-start">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
              +
            </div>
            <button
              type="button"
              onClick={() => setProfileImage(null)}
              className="bg-[#a66a2d] text-white px-3 py-1 rounded-full text-sm mt-4"
            >
              변경
            </button>
          </div>
        </div>
      </form>
  );
}