'use client';

import { ReactNode, useState, useEffect } from 'react';
import MyPageLayout from '@components/layout';
import { usePathname } from 'next/navigation';  
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';  
import FavoriteCafeCard from '../../components/FavoriteCafeCard';  

const FavoritesLayout = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      window.location.href = `/favorites/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    setSearchQuery('');
  }, [pathname]); 

  return (
    <MyPageLayout>
      <div className="flex flex-col bg-white w-full max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-8 min-h-screen">
        {/* 검색 바 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-10 pt-4">
          <div className="w-full flex justify-center">
            <div className="w-full sm:w-[300px] flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                placeholder={searchQuery === '' ? '좋아하는 카페를 바로 검색해보세요.' : ''}
                className="w-full p-2 border border-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900"
              />
              <button
                onClick={handleSearchSubmit}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-center items-center"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            {/* 편집하기 버튼이 렌더링되는 곳 */}
          </div>
        </div>

        {/* 페이지 내용 */}
        <main className="flex-1 pb-10">{children}</main>
      </div>
    </MyPageLayout>
  );
};

export default FavoritesLayout;