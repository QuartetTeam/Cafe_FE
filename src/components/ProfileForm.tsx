// 프로필 폼
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordVerification from "../components/PasswordVerification";
import ProfileImageModal from "../components/ProfileImageModal";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { FiEye, FiEyeOff } from "react-icons/fi";

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const match = numbers.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return value;
};

export default function ProfileForm() {
  const router = useRouter();
  
  const [isVerified, setIsVerified] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFailCount(0); 
  }, []);

  if (!isVerified) {
    return (
      <PasswordVerification
        setIsVerified={setIsVerified}
        failCount={failCount}
        setFailCount={setFailCount}
        setShowResetModal={setShowResetModal}
        setShowPasswordReset={() => setShowResetModal(true)} // Added prop
      />
    );
  }

  return (
    <div className="bg-white min-h-screen px-4 sm:px-8 md:px-16 py-6 sm:py-10 flex flex-col">
      <h1 className="text-xl sm:text-2xl font-bold text-black mb-6">계정 관리</h1>
      <ProfileUpdateForm setProfileImage={setProfileImage} />
      
      <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value="test1234@naver.com"
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
          />
          <p className="text-sm text-red-500 mt-1">* 이메일은 변경 불가능한 항목입니다.</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            placeholder="010-1234-5678"
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-4">비밀번호 변경</h2>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="현재 비밀번호를 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="새 비밀번호를 입력해주세요."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {isModalOpen && (
          <ProfileImageModal
            setProfileImage={setProfileImage}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
        
        <div className="mt-6 sm:mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-[#a66a2d] text-white px-6 py-2 rounded-full"
          >
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
}