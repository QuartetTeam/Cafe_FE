'use client';

import React, { useEffect, useRef, useState } from 'react';

interface EmailVerificationBoxProps {
  email: string;
  setEmail: (email: string) => void;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  onVerify: () => void;
}

const EmailVerificationBox = ({
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
  onVerify,
}: EmailVerificationBoxProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isVerified, setIsVerified] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVerified && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeft, isVerified]);

  const formatTime = (seconds: number): string => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRequestVerification = () => {
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    setEmailError('');
    setMessage('인증번호가 발송되었습니다.');
    setTimeLeft(180);
    setVerificationCode('');
    setIsVerified(false);
    setIsInputVisible(true);
  };

  const handleConfirm = () => {
    if (verificationCode === '123456') {
      setIsVerified(true);
      setMessage('인증이 완료되었습니다.');
    } else {
      setMessage('인증번호가 올바르지 않습니다.');
    }
    onVerify();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
          className="rounded-[10px] border p-2 shadow focus:outline-non text-gray-600"
        />
        <button
          type="button"
          onClick={handleRequestVerification}
          className="rounded-[10px] bg-[#846245] px-3 py-1 text-sm text-white disabled:opacity-50"
          disabled={timeLeft > 0 && isInputVisible}
        >
          인증번호 받기
        </button>
      </div>
      {emailError && <p className="text-sm text-red-500">{emailError}</p>}
      {isInputVisible && (
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConfirm();
            }}
            placeholder="인증번호 입력"
            className="rounded-[10px] border p-2 shadow focus:outline-none text-gray-600"
            disabled={isVerified}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{timeLeft > 0 ? `남은 시간: ${formatTime(timeLeft)}` : '시간 만료됨'}</span>
            {isVerified && <span className="text-green-600">인증 완료</span>}
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="mt-2 w-full rounded-[10px] bg-[#846245] px-4 py-2 text-white"
            disabled={isVerified}
          >
            인증 확인
          </button>
        </div>
      )}
      {message && <p className="text-sm text-blue-600">{message}</p>}
    </div>
  );
};

export default EmailVerificationBox;
