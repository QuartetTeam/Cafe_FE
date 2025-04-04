import { useState } from "react";

interface ProfileUpdateFormProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

// ProfileUpdateForm.tsx
export default function ProfileUpdateForm({
    setNickname,
    setPhone,
    setProfileImage,
  }: ProfileUpdateFormProps) {
    return (
        <form className="flex flex-col space-y-4 sm:p-4 md:p-6">
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          저장
        </button>
      </form>
    );
  }