'use client';

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const user = {
    name: "서은",
    profileImageUrl: "", // Replace with URL if available
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <header className="flex justify-between items-center px-4 sm:px-10 py-4 border-b relative">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* 햄버거 버튼 - 모바일 전용 */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 border rounded text-sm bg-white z-50"
          >
            ☰
          </button>
          <span className="text-lg font-bold text-[#5b3a1e]">Quartet</span>
          <nav className="hidden sm:flex space-x-6 text-sm text-gray-800">
            <Link href="/about" className="hover:text-[#a66a2d] transition-colors">Quartet 소개</Link>
            <Link href="/cafes" className="hover:text-[#a66a2d] transition-colors">모든 카페</Link>
            <Link href="/map" className="hover:text-[#a66a2d] transition-colors">카페 지도</Link>
            <Link href="/register" className="hover:text-[#a66a2d] transition-colors">매장 등록</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="프로필"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">
              {user.name.charAt(0)}
            </div>
          )}
          <span className="text-sm text-gray-800">{user.name} 님</span>
        </div>
      </header>

      {/* Main content with Sidebar */}
      <main className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 bg-white px-4 sm:px-10 py-6 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
