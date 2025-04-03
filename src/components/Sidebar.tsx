"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] p-6 bg-white h-full flex flex-col justify-between">
      <div>
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