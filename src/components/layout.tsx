'use client';

import { useState } from "react";
import Sidebar from "@components/Sidebar";
import Link from "next/link";
import Image from "next/image";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const user = {
    name: "서은",
    profileImageUrl: "", // 프로필 사진 URL로 대체
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* 상단 네비게이션 */}
      <header
        className={`flex justify-between items-center px-4 sm:px-10 py-4 border-b z-30 fixed top-0 left-0 w-full transition-colors duration-300 backdrop-blur-sm ${
          isSidebarOpen ? "bg-white/80" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-12">
          {/* 햄버거 버튼 */}
          {!isSidebarOpen && (
            <div className="md:hidden z-50 relative">
              <button
                onClick={toggleSidebar}
                className="text-gray-800 text-xl"
                aria-label="사이드바 열기"
                style={{ position: 'relative' }}
              >
                ☰
              </button>
            </div>
          )}

          {/* 콰르텟 텍스트 */}
          <span className="text-lg font-bold text-[#5b3a1e] whitespace-nowrap">Quartet</span>

          {/* 네비게이션 링크들 */}
          <nav className="hidden sm:flex space-x-6 text-sm text-gray-800">
            <Link href="/about" className="hover:text-[#a66a2d] transition-colors">Quartet 소개</Link>
            <Link href="/cafes" className="hover:text-[#a66a2d] transition-colors">모든 카페</Link>
            <Link href="/map" className="hover:text-[#a66a2d] transition-colors">카페 지도</Link>
            <Link href="/register" className="hover:text-[#a66a2d] transition-colors">매장 등록</Link>
          </nav>
        </div>

        {/* 프로필 이미지 */}
        <div className="flex items-center gap-2">
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt="프로필"
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
              {user.name.charAt(0)}
            </div>
          )}
          <span className="text-sm text-gray-800">{user.name} 님</span>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* 사이드바 열렸을 때 어두운 배경 */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" />
        )}

        <main className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            className={`bg-white z-40 flex flex-col justify-between transition-transform duration-300 transform
              fixed top-0 left-0 h-full w-[200px]
              md:fixed md:top-[64px] md:h-[calc(100vh-64px)]
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
          />
          <div className="flex-1 bg-white px-4 sm:px-10 py-6 overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}