"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] p-6 bg-white h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center">
        <ul className="space-y-3 text-sm">
          <li>
            <Link
              href="/mypage-member1"
              className={`block text-left w-full text-gray-700 hover:text-[#a66a2d] ${
                pathname.startsWith("/mypage-member1") && !pathname.includes("/favorites") && !pathname.includes("/diary")
                  ? "font-bold !text-black"
                  : ""
              }`}
            >
              계정 관리
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className={`block text-left w-full text-gray-700 ${
                pathname.startsWith("/favorites")
                  ? "font-bold text-black hover:text-[#a66a2d]"
                  : "hover:text-[#a66a2d]"
              }`}
            >
              즐겨찾기
            </Link>
          </li>
          <li>
            <Link
              href="/mypage-member1/diary"
              className={`block text-left w-full text-gray-700 hover:text-[#a66a2d] ${
                pathname.startsWith("/mypage-member1/diary") ? "font-bold !text-black" : ""
              }`}
            >
              카페일지
            </Link>
          </li>
        </ul>
      </div>
      <div className="ml-1">
        <button className="text-sm hover:text-[#a66a2d]">회원탈퇴</button>
      </div>
    </aside>
  );
};

export default Sidebar;