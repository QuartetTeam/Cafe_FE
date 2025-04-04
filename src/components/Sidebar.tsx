"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* 오버레이 - 모바일에서 사이드바 열릴 때만 표시 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 - 슬라이드 애니메이션 포함 */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-[180px] sm:w-[200px] md:w-[220px] bg-white z-40 flex-col justify-between transition-transform duration-300 transform relative ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        {/* 닫기 버튼 */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl px-2"
            aria-label="닫기"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center p-6 justify-start pt-12">
          <ul className="space-y-5 text-sm sm:text-sm md:text-base text-center">
            <li>
              <Link
                href="/mypage-owner"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname === "/mypage-owner" ? "font-bold text-black" : ""
                }`}
                onClick={onClose}
              >
                계정 관리
              </Link>
            </li>
            <li>
              <Link
                href="/mypage-owner/edit"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname.startsWith("/mypage-owner/edit") ? "font-bold text-black" : ""
                }`}
                onClick={onClose}
              >
                매장 정보 수정
              </Link>
            </li>
            <li>
              <Link
                href="/mypage-owner/manage"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname.startsWith("/mypage-owner/manage") ? "font-bold text-black" : ""
                }`}
                onClick={onClose}
              >
                매장 관리
              </Link>
            </li>
          </ul>
        </div>

        {pathname === "/mypage-owner" && (
          <div className="ml-1 p-6">
            <button className="text-sm hover:text-[#a66a2d]">회원탈퇴</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;