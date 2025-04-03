'use client';  // 클라이언트 컴포넌트로 설정

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';  // Heroicons을 사용한 돋보기 아이콘
import FavoriteCafeCard from '../../components/FavoriteCafeCard';  // FavoriteCafeCard 컴포넌트 import

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/favorites/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();  // 엔터 키 눌렀을 때 검색 실행
    }
  };

  return (
    <div className="flex flex-col bg-white w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* 검색 바 */}
      <div className="flex justify-center items-center mb-6 pt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}  // 엔터 키 이벤트 처리
          placeholder={searchQuery === '' ? "좋아하는 카페를 바로 검색해보세요." : ""}
          className="w-full max-w-md p-2 border border-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900"
        />
        <button
          onClick={handleSearchSubmit}  // 돋보기 아이콘 클릭 시 검색 실행
          className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* 페이지 내용 */}
      <main className="flex-1 pb-10">{children}</main>
    </div>
  );
}