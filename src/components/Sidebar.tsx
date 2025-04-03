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
        className={`fixed md:static top-0 left-0 h-full w-[200px] bg-white z-40 flex-col justify-between transition-transform duration-300 transform relative ${
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
        <div className="flex-1 flex flex-col items-center p-6">
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link
                href="/mypage-member1"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname.startsWith("/mypage-member1") &&
                  !pathname.includes("/favorites") &&
                  !pathname.includes("/diary")
                    ? "font-bold"
                    : ""
                }`}
                onClick={onClose}
              >
                계정 관리
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname.startsWith("/favorites") ? "font-bold text-black" : ""
                }`}
                onClick={onClose}
              >
                즐겨찾기
              </Link>
            </li>
            <li>
              <Link
                href="/mypage-member1/diary"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname.startsWith("/mypage-member1/diary") ? "font-bold !text-black" : ""
                }`}
                onClick={onClose}
              >
                카페일지
              </Link>
            </li>
          </ul>
        </div>

        {pathname === "/mypage-member1" && (
          <div className="ml-1 p-6">
            <button className="text-sm hover:text-[#a66a2d]">회원탈퇴</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;