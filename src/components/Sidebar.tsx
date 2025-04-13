"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WithdrawalModal from "./WithdrawalModal";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Sidebar = ({ isOpen, onClose, className }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const handleWithdraw = async () => {
    try {
      await axios.delete("/api/user"); // 실제 탈퇴 API 주소로 교체 필요
      alert("회원 탈퇴가 완료되었습니다.");
      router.push("/");
    } catch (err) {
      console.error("탈퇴 실패:", err);
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    } finally {
      setIsWithdrawalModalOpen(false);
    }
  };

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
                href="/store-owner"
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
                href="/manage-owner"
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
          <div className="p-6">
            <button
              className="text-sm hover:text-[#a66a2d]"
              onClick={() => setIsWithdrawalModalOpen(true)}
            >
              회원탈퇴
            </button>
          </div>
        )}
      </aside>
      {isWithdrawalModalOpen && (
        <WithdrawalModal
          closeModal={() => setIsWithdrawalModalOpen(false)}
          onConfirm={handleWithdraw}
        />
      )}
    </>
  );
};

export default Sidebar;