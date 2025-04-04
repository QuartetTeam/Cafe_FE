import React from 'react';

interface PasswordChangeFormProps {
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <div>
      {/* Password change form implementation */}
    </div>
  );
};

interface PasswordVerificationProps {
  // other props if any
}

const PasswordVerification: React.FC<PasswordVerificationProps> = () => {
  const [showVerificationInput, setShowVerificationInput] = React.useState(false);
  const [timer, setTimer] = React.useState(180);
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isCodeExpired, setIsCodeExpired] = React.useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  React.useEffect(() => {
    if (showVerificationInput && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showVerificationInput]);

  React.useEffect(() => {
    if (timer === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsCodeExpired(true);
    }
  }, [timer]);

  const handleVerificationRequest = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("이메일이 올바른 형식이 아닙니다.");
      return;
    }

    try {
      const response = await fetch("/api/send-verification-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log(`이메일(${email})로 인증번호 전송됨`);
        alert("인증번호가 이메일로 전송되었습니다.");

        setShowVerificationInput(true);
        setTimer(180);
        setIsCodeExpired(false);
        setVerificationCode("");
      } else {
        alert("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("인증번호 전송 오류:", error);
      alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

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
            placeholder="인증번호를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded text-black"
            disabled={isCodeExpired}
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded"
            onClick={() => {
              if (verificationCode === "123456") {
                setShowPasswordChangeForm(true);
                alert("인증이 완료되었습니다.");
              } else {
                alert("인증번호가 일치하지 않습니다.");
              }
            }}
            disabled={isCodeExpired}
          >
            인증 확인
          </button>
        </div>
      )}

      {showPasswordChangeForm && (
        <PasswordChangeForm
          newPassword={""}
          setNewPassword={() => {}}
          confirmPassword={""}
          setConfirmPassword={() => {}}
        />
      )}
    </div>
  );
};

export default PasswordVerification;