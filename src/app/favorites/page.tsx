"use client";
import FavoriteCafeCard from "../../components/FavoriteCafeCard";
import { useState } from "react";

const dummyFavorites = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  name: `카페 ${i + 1}`,
  image: "",
  time: "평일 09시-22시 / 주말 10-17시",
  location: "서울시 노원구",
  isFavorite: true,
}));

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(dummyFavorites);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const totalPages = Math.ceil(favorites.length / perPage);
  const paginatedData = favorites.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.map((cafe) =>
        cafe.id === id ? { ...cafe, isFavorite: !cafe.isFavorite } : cafe
      )
    );
  };

  return (
    <div className="px-10 py-8">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="text-sm px-3 py-1 bg-blue-100 rounded">수정하기</button>
          <button className="text-sm px-3 py-1 bg-red-100 rounded">삭제하기</button>
        </div>
        <div className="text-sm">
          <label htmlFor="perPage" className="mr-2">표시 개수:</label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[5, 10, 20, 40].map((count) => (
              <option key={count} value={count}>{count}개</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {paginatedData.map((cafe) => (
          <FavoriteCafeCard
            key={cafe.id}
            name={cafe.name}
            image={cafe.image}
            time={cafe.time}
            location={cafe.location}
            isFavorite={cafe.isFavorite}
            onToggleFavorite={() => toggleFavorite(cafe.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
