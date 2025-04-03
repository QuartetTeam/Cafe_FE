'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FavoriteCafeCard from '@components/FavoriteCafeCard';

const dummyFavorites = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  name: `카페 ${i + 1}`,
  image: '',
  time: '평일 09시-22시 / 주말 10-17시',
  location: '서울시 노원구',
  isFavorite: true,
}));

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = dummyFavorites.filter((cafe) =>
    cafe.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-black min-h-screen">
      <h2 className="text-xl font-bold mb-6">
        "{keyword}"에 대한 검색 결과
      </h2>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
        <label htmlFor="perPage" className="font-medium">표시 개수:</label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded"
        >
          {[5, 10, 20, 40].map((count) => (
            <option key={count} value={count}>
              {count}개
            </option>
          ))}
        </select>
      </div>

      {paginatedData.length === 0 ? (
        <p className="font-bold text-gray-900">검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {paginatedData.map((cafe) => (
            <FavoriteCafeCard
              key={cafe.id}
              name={cafe.name}
              image={cafe.image}
              time={cafe.time}
              location={cafe.location}
              isFavorite={cafe.isFavorite}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
