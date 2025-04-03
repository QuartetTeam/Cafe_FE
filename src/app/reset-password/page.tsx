'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white border rounded-xl p-6 shadow-md">
          <h1 className="text-xl font-bold text-center text-black mb-6">비밀번호 재설정</h1>
  
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

              alert("비밀번호가 재설정되었습니다.");
              router.back();
            }}
          >
            <div className="relative">
              <label className="block text-sm font-medium text-black mb-1">새 비밀번호</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded text-sm text-black"
                placeholder="새 비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-black mb-1">비밀번호 확인</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded text-sm text-black"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#a66a2d] hover:bg-[#915a23] text-white rounded-full"
            >
              재설정 완료
            </button>
          </form>
        </div>
      </div>
    );
  }