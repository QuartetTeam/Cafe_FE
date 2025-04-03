"use client";
import FavoriteCafeCard from "../../components/FavoriteCafeCard";
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const categories = ["음료", "디저트/베이커리", "브런치", "무드"];

  const handleFilterClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  // 필터링된 즐겨찾기 목록
  const filteredFavorites = selectedCategory
    ? favorites.filter((cafe) => cafe.category === selectedCategory)
    : favorites;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredFavorites.length / perPage);

  // 필터링된 즐겨찾기 목록에 페이지네이션 적용
  const paginatedData = filteredFavorites.slice(
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

  const moveCafe = (id: number, direction: "up" | "down") => {
    let newIndex = -1;

    setFavorites((prev) => {
      const index = prev.findIndex((cafe) => cafe.id === id);
      const updated = [...prev];

      if (direction === "up" && index > 0) {
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      } else if (direction === "down" && index < prev.length - 1) {
        [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      }

      newIndex = updated.findIndex((cafe) => cafe.id === id);
      return updated;
    });

    const newPage = Math.floor(newIndex / perPage) + 1;
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); // perPage가 바뀔 때마다 페이지는 1페이지로 리셋
  };

  return (
    <div className="px-10 py-8">
      <div className="mb-4 flex flex-col items-end gap-2">
        <FavoriteEditControls
          onClick={() => setIsEditing(true)}
          isEditing={isEditing}
          selectedIds={selectedIds}
          favorites={favorites}
          setSelectedIds={setSelectedIds}
          setIsEditing={setIsEditing}
          setFavorites={setFavorites}
        />
        <div className="w-full flex justify-center">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={handleFilterClick}
          />
        </div>
        <div className="text-sm">
          <label htmlFor="perPage" className="mr-2 text-black">표시 개수:</label>
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

      <FavoriteCafeList
        cafes={
          isEditing
            ? filteredFavorites.filter((cafe) => cafe.isFavorite)
            : paginatedData.filter((cafe) => cafe.isFavorite)
        }
        isEditing={isEditing}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        toggleFavorite={toggleFavorite}
        setFavorites={setFavorites}
        moveCafe={moveCafe}
      />

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
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