'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VisitRecordHeaderProps {
  nickname: string;
  profileImage: string;
  cafeRecords: any[];
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
}

export default function VisitRecordHeader({ nickname, profileImage, cafeRecords, currentMonth, setCurrentMonth }: VisitRecordHeaderProps) {
  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
  };

  const monthName = new Date(2021, currentMonth).toLocaleString('default', { month: 'long' });

  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-16 mb-10">
      {/* 프로필 이미지 및 닉네임 */}
      <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
        <Image src={profileImage && profileImage.trim() !== '' ? profileImage : '/images/default-profile.png'} alt="Profile" className="rounded-full" width={56} height={56} />
        <div className="text-sm text-[#CDAA85] font-semibold">{nickname || '닉네임 없음'}</div>
      </div>

      {/* 카페일지, 날짜, 회원 */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center">
          <div className="text-sm text-[#3E2723] font-semibold">카페일지</div>
          <div className="text-lg text-[#CDAA85] font-semibold">{cafeRecords.length}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm text-[#3E2723] font-semibold">날짜</div>
          <div className="flex items-center justify-center gap-2">
            <button onClick={handlePreviousMonth} className="text-lg text-[#CDAA85]">◀</button>
            <div className="text-lg font-semibold text-[#CDAA85]">{monthName}</div>
            <button onClick={handleNextMonth} className="text-lg text-[#CDAA85]">▶</button>
          </div>
        </div>
      </div>
    </section>
  );
}