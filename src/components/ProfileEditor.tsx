'use client';

import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface ProfileEditorProps {
  email: string;
  nickname: string;
  setNickname: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

const ProfileEditor = ({
  email,
  nickname,
  setNickname,
  phoneNumber,
  setPhoneNumber,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}: ProfileEditorProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        <label className="font-semibold text-gray-800">이메일</label>
        <input
          type="email"
          value={email}
          readOnly
          placeholder="이메일을 입력해주세요"
          className="rounded-[10px] border bg-gray-100 p-2 shadow focus:outline-none text-gray-600 placeholder:text-gray-600"
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <label className="font-semibold text-gray-800">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          className="rounded-[10px] border p-2 shadow focus:outline-none placeholder:text-gray-600"
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <label className="font-semibold text-gray-800">전화번호</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호를 입력해주세요"
          className="rounded-[10px] border p-2 shadow focus:outline-none placeholder:text-gray-600"
        />
      </div>

      <h2 className="text-lg font-bold text-black mt-4 mb-1">비밀번호 변경</h2>

      <div className="flex flex-col gap-y-1">
        <label className="font-semibold text-gray-800">현재 비밀번호</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력해주세요"
            className="w-full rounded-[10px] border p-2 shadow focus:outline-none placeholder:text-gray-600"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
        {/* <p className="text-sm text-red-500 mt-1">비밀번호가 너무 짧습니다.</p> */}
      </div>

      <div className="flex flex-col gap-y-1">
        <label className="font-semibold text-gray-800">새 비밀번호</label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력해주세요"
            className="w-full rounded-[10px] border p-2 shadow focus:outline-none placeholder:text-gray-600"
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500"
          >
            {showNewPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
        {/* <p className="text-sm text-red-500 mt-1">비밀번호가 너무 짧습니다.</p> */}
      </div>

      <div className="flex flex-col gap-y-1">
        <label className="font-semibold text-gray-800">비밀번호 확인</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인을 입력해주세요"
            className="w-full rounded-[10px] border p-2 shadow focus:outline-none placeholder:text-gray-600"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500"
          >
            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
        {/* <p className="text-sm text-red-500 mt-1">비밀번호가 너무 짧습니다.</p> */}
      </div>
    </div>
  );
};

export default ProfileEditor;
