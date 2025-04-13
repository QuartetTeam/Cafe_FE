'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import EmailVerificationBox from './EmailVerificationBox';

// 비밀번호 변경 폼 컴포넌트의 props 타입 정의
interface PasswordChangeFormProps {
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

// 비밀번호 변경 폼 컴포넌트 정의
export const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [email, setEmail] = React.useState(""); // 이메일 상태
  const [verificationCode, setVerificationCode] = React.useState(""); // 인증번호 상태
  const router = useRouter();

  // 인증번호 확인 처리 함수
  const handleConfirmVerification = () => {
    if (verificationCode === "123456") {
      // 인증 성공 시
      sessionStorage.setItem("verified", "true"); // 인증 상태 저장
      setEmail("");
      setVerificationCode("");
      alert("인증이 완료되었습니다.");
      router.push("/reset-password"); // ✅ 인증 완료 시 직접 이동
    } else {
      // 인증 실패 시
      alert("재인증 하십시오."); // 재인증 메시지
      setVerificationCode(""); // 인증번호 입력란 초기화
    }
  };

  return (
    <div className="flex justify-center items-start pt-24 min-h-screen bg-white">
      <EmailVerificationBox
        email={email}
        setEmail={setEmail}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        onVerify={handleConfirmVerification}
      />
    </div>
  );
};