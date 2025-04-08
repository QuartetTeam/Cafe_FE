'use client';

import React from 'react';
import { useRouter } from "next/navigation";

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
  return (
    <div className="flex justify-center items-start pt-24 min-h-screen bg-white">
      <PasswordVerification
        setIsVerified={() => {}} // 인증 상태는 상위에서 제어되지 않으므로 임시 비어있는 함수 전달
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </div>
  );
};

// 비밀번호 확인 컴포넌트의 props 타입 정의
interface PasswordVerificationProps {
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

// 비밀번호 확인 컴포넌트 정의
const PasswordVerification: React.FC<PasswordVerificationProps> = ({ setIsVerified, newPassword, setNewPassword, confirmPassword, setConfirmPassword }) => {
  const [showVerificationInput, setShowVerificationInput] = React.useState(false); // 인증 입력란 보이기/숨기기
  const [timer, setTimer] = React.useState(180); // 타이머 상태 (180초)
  const [email, setEmail] = React.useState(""); // 이메일 상태
  const [verificationCode, setVerificationCode] = React.useState(""); // 인증번호 상태
  const [isCodeExpired, setIsCodeExpired] = React.useState(false); // 인증코드 만료 여부
  const [emailError, setEmailError] = React.useState(""); // 이메일 오류 상태
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // 이메일 유효성 검사 함수
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 인증번호 타이머 함수 (타이머 실행 및 종료 처리)
  React.useEffect(() => {
    sessionStorage.clear();
    if (showVerificationInput && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showVerificationInput]);

  // 타이머가 0이 되면 인증코드 만료 처리
  React.useEffect(() => {
    if (timer === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsCodeExpired(true);
    }
  }, [timer]);

  // 인증번호 요청 처리 함수
  const handleVerificationRequest = () => {
    setShowVerificationInput(true); // 인증번호 입력란 보이기
    setTimer(180); // 타이머 초기화
    setIsCodeExpired(false); // 인증코드 만료 여부 초기화
    setVerificationCode(""); // 인증번호 초기화
    alert("인증번호가 이메일로 전송되었습니다."); // 성공 상태 가정
  };

  // 인증번호 확인 처리 함수
  const handleConfirmVerification = () => {
    if (verificationCode === "123456") {
      // 인증 성공 시
      if (timerRef.current) {
        clearInterval(timerRef.current); // 타이머 멈춤
      }
      sessionStorage.setItem("verified", "true"); // 인증 상태 저장
      setShowVerificationInput(false);
      setEmail("");
      setVerificationCode("");
      setEmailError("");
      alert("인증이 완료되었습니다.");
      router.push("/reset-password"); // ✅ 인증 완료 시 직접 이동
    } else {
      // 인증 실패 시
      setEmailError("재인증 하십시오."); // 재인증 메시지
      setVerificationCode(""); // 인증번호 입력란 초기화
      setIsCodeExpired(false); // 인증 만료 상태 초기화
      setShowVerificationInput(false); // 인증 입력란을 다시 숨김

      // 인증번호 발송 버튼 활성화
      alert("인증번호를 다시 발송해주세요.");
    }
  };

  React.useEffect(() => {
    const verified = sessionStorage.getItem("verified");
    if (verified === "true") {
      // 인증 후 자동 이동은 제거 (루프 원인)
      // router.push("/mypage-member1");
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-lg font-semibold text-black mb-4">비밀번호 재설정을 위해 인증을 진행합니다.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">닉네임 또는 이름</label>
        <input
          type="text"
          placeholder="닉네임 또는 이름을 입력하세요"
          className="w-full px-3 py-2 border border-gray-300 rounded text-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-black mb-1">이메일</label>
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="이메일을 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l text-black"
          />
          <button
            type="button"
            onClick={handleVerificationRequest}
            className="bg-[#a66a2d] text-white px-4 py-2 rounded-r"
          >
            {showVerificationInput ? "재발송" : "인증 요청"}
          </button>
        </div>
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>

      {showVerificationInput && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">
            인증번호{" "}
            {timer > 0 ? (
              <span className="text-red-500 text-xs ml-2">
                남은 시간: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
              </span>
            ) : (
              <span className="text-red-500 text-xs ml-2">
                만료되었습니다. 재요청해주세요.
              </span>
            )}
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isCodeExpired) {
                handleConfirmVerification();
              }
            }}
            placeholder="인증번호를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded text-black"
            disabled={isCodeExpired}
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-[#6F4F37] text-white text-sm rounded hover:bg-[#5a3f2d]"
            onClick={handleConfirmVerification}
            disabled={isCodeExpired}
          >
            인증 확인
          </button>
        </div>
      )}
    </div>
  );
};
