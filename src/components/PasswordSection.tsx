'use client';

import React from 'react';

interface PasswordSectionProps {
    currentPassword: string;
    setCurrentPassword: (value: string) => void;
    newPassword: string;
    setNewPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
  }
  
  const PasswordSection = ({
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  }: PasswordSectionProps): JSX.Element => {
    return (
      <div className="flex flex-col gap-y-5 mt-4">
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold text-gray-800">현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="rounded-[10px] border p-2 shadow focus:outline-none"
          />
        </div>
  
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold text-gray-800">새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-[10px] border p-2 shadow focus:outline-none"
          />
        </div>
  
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold text-gray-800">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-[10px] border p-2 shadow focus:outline-none"
          />
        </div>
      </div>
    );
  };
  
  export default PasswordSection;
  