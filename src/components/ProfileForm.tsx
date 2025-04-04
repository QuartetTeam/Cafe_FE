import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordVerification from "../components/PasswordVerification";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import PasswordChangeForm from "../components/PasswordChangeForm";
import ProfileImageModal from "../components/ProfileImageModal";

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
    <div className="bg-white min-h-screen flex-1 px-4 sm:px-6 md:px-10 py-6">
      <h1 className="text-xl sm:text-2xl font-bold text-black mb-6">계정 관리</h1>

      <ProfileUpdateForm
        nickname={nickname}
        setNickname={setNickname}
        phone={phone}
        setPhone={setPhone}
        setProfileImage={setProfileImage}
      />

      <PasswordChangeForm
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />

      {isModalOpen && (
        <ProfileImageModal
          setProfileImage={setProfileImage}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}