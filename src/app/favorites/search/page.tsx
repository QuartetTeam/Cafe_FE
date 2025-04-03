'use client';

import { useSearchParams } from 'next/navigation';
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

  const filtered = dummyFavorites.filter((cafe) =>
    cafe.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-black min-h-screen">
      <h2 className="text-xl font-bold mb-6">
        "{keyword}"에 대한 검색 결과
      </h2>

      {filtered.length === 0 ? (
        <p className="font-bold text-gray-900">검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {filtered.map((cafe) => (
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
    </div>
  );
}

