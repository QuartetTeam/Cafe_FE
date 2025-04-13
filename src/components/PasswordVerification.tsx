import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Heroicons 아이콘 임포트
import { PasswordChangeForm } from "./PasswordChangeForm"; // default export 제거
import { useRouter } from "next/navigation";

interface PasswordVerificationProps {
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  failCount: number;
  setFailCount: React.Dispatch<React.SetStateAction<number>>;
  setShowResetModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPasswordReset: React.Dispatch<React.SetStateAction<boolean>>; // 비밀번호 재설정 모달을 열기 위한 함수 추가
}

const PasswordVerification = ({
  setIsVerified,
  failCount,
  setFailCount,
  setShowResetModal,
  setShowPasswordReset, // 모달 열기 함수 받기
}: PasswordVerificationProps) => {
  const [password, setPassword] = useState("0000");  // 비밀번호 상태
  const [showPassword, setShowPassword] = useState(false);  // 비밀번호 표시 여부
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false); // 비밀번호 재설정 모달 상태
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 상태 추가
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태 추가
  const router = useRouter();

  // 기본 비밀번호 설정
  const correctPassword = "0000";

  // 자동 인증 처리
  useEffect(() => {
    const isVerified = sessionStorage.getItem("verified");
    if (isVerified === "true") {
      setIsVerified(true); // 인증 처리 후 모달 생략
      router.push("/mypage-member1"); // 인증 성공 시 계정 관리 페이지로 이동
    }
  }, []);

  // 비밀번호 입력값 변경 처리
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage(""); // 비밀번호를 입력할 때마다 오류 메시지 초기화
  };

  // 비밀번호 확인
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      sessionStorage.setItem("verified", "true"); // 일시적으로 저장
      setIsVerified(true);
      router.push("/mypage-member1"); // 인증 성공 시 계정 관리 페이지로 이동
    } else {
      setFailCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (failCount > 0 && failCount < 5) {
      setErrorMessage(`틀린 횟수 ${failCount}/5회`);
    }
    if (failCount >= 5) {
      setShowResetModal(true);
      setIsPasswordResetVisible(true); // 비밀번호 재설정 모달 자동 표시
    }
  }, [failCount]);

  // 비밀번호 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // 비밀번호 재설정 모달 열기
  const handlePasswordResetClick = () => {
    setShowResetModal(true);
    setIsPasswordResetVisible(true); // 비밀번호 재설정 모달 열기
  };

  if (isPasswordResetVisible) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-24 px-4">
        <PasswordChangeForm
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-24 px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">비밀번호 확인</h2>
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className="w-full h-12 p-2 pr-10 border border-gray-300 rounded text-gray-900 text-base"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} // Enter 키로 확인 버튼 클릭 설정
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      {failCount >= 3 && (
        <p className="text-red-500 text-sm mb-6">5번 틀리면 비밀번호를 재설정하셔야 합니다.</p>
        )/* 3번 틀렸을 때 표시 */}
      <p 
        className="text-[#6F4F37] text-sm mb-6 cursor-pointer underline"
        onClick={handlePasswordResetClick}
      >
        비밀번호가 기억나지 않으세요?
      </p>
      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto px-4 py-2 bg-[#6F4F37] text-white rounded hover:bg-[#5a3f2d] transition duration-300"
      >
        확인
      </button>
    </div>
  );
};

export default PasswordVerification;