"use client";
import FavoriteCafeCard from "../../components/FavoriteCafeCard";
import { useState, useEffect } from "react";
import { Cafe } from "../../types";
import CategoryFilter from "../../components/CategoryFilter";
import FavoriteCafeList from "../../components/FavoriteCafeList";
import FavoriteEditControls from "../../components/FavoriteEditControls";

const generateDummyFavorites = (): Cafe[] => (
  Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: `카페 ${i + 1}`,
    image: "",
    time: "평일 09시-22시 / 주말 10-17시",
    location: "서울시 노원구",
    isFavorite: true,
    category: ["음료", "디저트/베이커리", "브런치", "무드"][i % 4],
  }))
);

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Cafe[]>(generateDummyFavorites());
  const [filteredFavorites, setFilteredFavorites] = useState<Cafe[]>(favorites);
  const [paginatedData, setPaginatedData] = useState<Cafe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const categories = ["음료", "디저트/베이커리", "브런치", "무드"];

  // 필터 적용
  useEffect(() => {
    const filtered = selectedCategory
      ? favorites.filter((cafe) => cafe.isFavorite && cafe.category === selectedCategory)
      : favorites.filter((cafe) => cafe.isFavorite);
    setFilteredFavorites(filtered);

    if (!isEditing) {
      setCurrentPage(1); // 필터 바뀌면 첫 페이지로 이동 (편집 중이 아닐 때만)
    }
  }, [favorites, selectedCategory]);

  // 페이지네이션 적용
  useEffect(() => {
    const start = (currentPage - 1) * perPage;
    const end = currentPage * perPage;
    setPaginatedData(filteredFavorites.slice(start, end));
  }, [filteredFavorites, currentPage, perPage]);

  const totalPages = Math.ceil(filteredFavorites.length / perPage);

  const handleFilterClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.map((cafe) =>
        cafe.id === id ? { ...cafe, isFavorite: !cafe.isFavorite } : cafe
      )
    );
  };

  const moveCafe = (id: number, direction: "up" | "down") => {
    setFavorites((prev) => {
      const index = prev.findIndex((cafe) => cafe.id === id);
      const updated = [...prev];
      if (direction === "up" && index > 0) {
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      } else if (direction === "down" && index < prev.length - 1) {
        [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      }
      return updated;
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 pt-[64px]">
        {/* 왼쪽: 카테고리 필터 */}
        <div className="mb-4">
        <div className="relative flex justify-center items-start">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={handleFilterClick}
          />
            <div className="absolute -top-10 right-0 sm:-top-20">
            <FavoriteEditControls
              onClick={() => setIsEditing(true)}
              isEditing={isEditing}
              selectedIds={selectedIds}
              favorites={favorites}
              setSelectedIds={setSelectedIds}
              setIsEditing={setIsEditing}
              setFavorites={setFavorites}
            />
          </div>
        </div>

        {/* 오른쪽: 표시 개수 */}
        <div className="mt-4 flex justify-end">
          <div className="text-sm flex items-center gap-2 whitespace-nowrap">
            <label htmlFor="perPage" className="text-black">표시 개수:</label>
            <select
              id="perPage"
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 rounded px-2 py-1 text-black"
            >
              {[5, 10, 20, 40].map((count) => (
                <option key={count} value={count}>{count}개</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <FavoriteCafeList
        cafes={paginatedData}
        isEditing={isEditing}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        toggleFavorite={toggleFavorite}
        setFavorites={setFavorites}
        moveCafe={moveCafe}
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded text-sm ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}