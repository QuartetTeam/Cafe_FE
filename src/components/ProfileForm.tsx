import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordVerification from "@components/PasswordVerification";
import ProfileImageModal from "@components/ProfileImageModal";
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileEditor from './ProfileEditor';
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

const ProfileForm = () => {
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(true);
  const [failCount, setFailCount] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
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
   /* 실제 운영 시에는 아래 주석 해제
   const verified = sessionStorage.getItem("verified");
    if (verified === "true") {
      setIsVerified(true);
    }    */

   // 테스트 중일 경우 무조건 초기화
      sessionStorage.removeItem("verified");
      setIsVerified(false);
    // 테스트 끝나면 위의 2줄 삭제
    setCheckingVerification(false);
  }, []);

  useEffect(() => {
    if (!confirmPassword) return;

    setErrors((prev: any) => {
      const updated = { ...prev };
      if (confirmPassword === newPassword) {
        delete updated.confirmPassword;
      } else {
        updated.confirmPassword = "비밀번호가 맞지 않습니다.";
      }
      return updated;
    });
  }, [confirmPassword, newPassword]);

  useEffect(() => {
    if (nickname.trim().length >= 2) {
      setErrors((prev: any) => {
        const updated = { ...prev };
        delete updated.nickname;
        return updated;
      });
    }
  }, [nickname]);

  useEffect(() => {
    const digitsOnlyPhone = phone.replace(/\D/g, "");
    if (digitsOnlyPhone.length === 11) {
      setErrors((prev: any) => {
        const updated = { ...prev };
        delete updated.phone;
        return updated;
      });
    }
  }, [phone]);

  const handleChange = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "nickname") setNickname(value);
    if (field === "phone") setPhone(formatPhoneNumber(value));

    if (field === "newPassword") {
      setNewPassword(value);
    }

    if (field === "confirmPassword") {
      setConfirmPassword(value);
    }

    if (field === "nickname" || field === "phone" || field === "newPassword" || field === "confirmPassword") {
      validateForm();
    }
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
    setErrors(formErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length === 0) {
      const profileData = {
        nickname,
        phone,
        currentPassword,
        newPassword,
        confirmPassword,
        profileImage,
      };

      console.log("변경사항 저장됨:", profileData);

      // TODO: 여기에 실제 API 요청 또는 로컬 저장 로직 추가
      // 예: await fetch('/api/update-profile', { method: 'POST', body: JSON.stringify(profileData) });

      // router.push("/mypage-member1"); // 저장 후 이동 가능
    }
  };

  if (checkingVerification) {
    return null; // 인증 상태 확인 중일 때 아무 것도 렌더링하지 않음
  }

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
        setIsModalOpen={setIsModalOpen}
      />

      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-2 sm:px-4">
        <ProfileEditor
          email="test1234@naver.com"
          nickname={nickname}
          setNickname={setNickname}
          phoneNumber={phone}
          setPhoneNumber={setPhone}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
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
};

export default ProfileForm;