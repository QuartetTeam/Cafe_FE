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

const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

export default function ProfileForm() {
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState({
    nickname: false,
    phone: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
    setFailCount(0);
  }, []);

  const handleChange = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "nickname") setNickname(value);
    if (field === "phone") setPhone(formatPhoneNumber(value));
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    validateForm();
  };

  const validateForm = () => {
    let formErrors: any = {};
    if (nickname.trim().length < 2) {
      formErrors.nickname = "닉네임은 두 글자 이상이어야 합니다.";
    }

    const digitsOnlyPhone = phone.replace(/\D/g, "");
    if (digitsOnlyPhone.length !== 11) {
      formErrors.phone = "전화번호는 숫자 11자리를 입력해주세요.";
    }

    if (!validatePassword(newPassword)) {
      formErrors.newPassword = "비밀번호는 영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.";
    }
    if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = "비밀번호가 맞지 않습니다.";
    }
    setErrors(formErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("변경사항 저장됨"); // 여기에 실제 제출 로직을 연결할 수 있음, 현재는 로그로만 확인
      // 나중에 이전 페이지로 이동하려면 아래 주석 해제 - 무조건 이전 페이지로 이동, 이전 페이지 없으면 홈으로
      // if (typeof window !== "undefined" && window.history.length > 1) {
      //   router.back();
      // } else {
      //   router.push("/mypage-owner");
      // }
    }
  };

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
    <div className="bg-white min-h-screen px-4 sm:px-8 md:px-16 py-6 sm:py-10 flex flex-col pt-16">
      <h1 className="text-xl sm:text-2xl font-bold text-black mb-6">계정 관리</h1>
      <ProfileUpdateForm
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        openModal={() => setIsModalOpen(true)}
      />

      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-2 sm:px-4">
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
            onChange={(e) => handleChange("nickname", e.target.value)}
            placeholder="닉네임을 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
          {touched.nickname && errors.nickname && (
            <p className="text-sm text-red-500 mt-1">{errors.nickname}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="010-1234-5678"
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          />
          {touched.phone && errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
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
            onChange={(e) => handleChange("newPassword", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          {touched.newPassword && errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
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
      </form>
    </div>
  );
}