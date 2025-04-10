"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Sidebar = ({ isOpen, onClose, className }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* 오버레이 - 모바일에서 사이드바 열릴 때만 표시 */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 - 슬라이드 애니메이션 포함 */}
      <aside
        className={`md:absolute ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-full md:z-10 md:pt-[64px] w-[200px] bg-white flex flex-col justify-between transition-transform duration-300 transform ${className}`}
      >
        <div className="flex-1 flex flex-col items-center p-6 justify-start pt-12">
          <ul className="space-y-5 text-sm sm:text-sm md:text-base text-center">
            <li>
              <Link
                href="/mypage-member1"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname === "/mypage-member1" ? "font-bold text-black" : ""
                }`}
                onClick={onClose}
              >
                계정 관리
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className="block text-center w-full text-gray-700 hover:text-[#a66a2d]"
                onClick={onClose}
              >
                즐겨찾기
              </Link>
            </li>
            <li>
              <Link
                href="/visit-record"
                className={`block text-center w-full text-gray-700 hover:text-[#a66a2d] ${
                  pathname.startsWith("/visit-record") ? "font-bold text-black" : ""
                }`}
                onClick={onClose}
              >
                카페 일지
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;