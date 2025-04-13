'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Heroicons 아이콘 임포트

const ResetPasswordPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    return (
      <div className="flex justify-center px-4 sm:px-0">
        <div className="w-full max-w-md bg-white border p-4 sm:p-6 shadow-md">
          <h1 className="text-lg sm:text-xl font-bold text-center text-black mb-6">비밀번호 재설정</h1>
  
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

              const currentPassword = password;
              const currentConfirmPassword = confirmPassword;

              setPassword("");
              setConfirmPassword("");

              if (!passwordRegex.test(currentPassword)) {
                alert("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
                return;
              }

              if (currentPassword !== currentConfirmPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
              }

              // 실제 서비스에서는 아래와 같이 비밀번호를 서버에 전송해야 합니다.
              // try {
              //   const response = await fetch("/api/reset-password", {
              //     method: "POST",
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //     body: JSON.stringify({ password: currentPassword }),
              //   });
              //
              //   if (!response.ok) {
              //     throw new Error("비밀번호 재설정 실패");
              //   }
              // } catch (error) {
              //   console.error(error);
              //   alert("비밀번호 재설정에 실패했습니다.");
              //   return;
              // }

              alert("비밀번호가 재설정되었습니다.");
              router.push("/mypage-owner");
               // 나중에 이전 페이지로 이동하려면 아래 주석 해제 - 무조건 이전 페이지로 이동, 이전 페이지 없으면 홈으로
               // if (typeof window !== "undefined" && window.history.length > 1) {
               //   router.back();
               // } else {
               //   router.push("/mypage-owner");
               // }
            }}
          >
            <div className="relative">
              <label className="block text-sm font-medium text-black mb-1">새 비밀번호</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded text-sm sm:text-base text-black"
                placeholder="새 비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.</p>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">비밀번호 확인</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded text-sm sm:text-base text-black"
                  placeholder="비밀번호 재입력"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              {isMismatch && (
                <p className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 sm:py-2.5 bg-[#a66a2d] hover:bg-[#915a23] text-white rounded-full text-sm sm:text-base"
            >
              재설정 완료
            </button>
          </form>
        </div>
      </div>
    );
};

export default ResetPasswordPage;