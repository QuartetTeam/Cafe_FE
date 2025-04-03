// 즐겨찾기 리스트 출력 + 카드 감싸는 로직 
import React from "react";
import { Cafe } from "../types";
import FavoriteCafeCard from "./FavoriteCafeCard";
import FavoriteSortButtons from "./FavoriteSortButtons";

type Props = {
    cafes: Cafe[]; // 카페 목록
    isEditing: boolean; // 편집 모드 여부
    selectedIds: number[]; // 선택된 카페 ID 목록
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>; // 선택된 ID 설정 함수
    toggleFavorite: (id: number) => void; // 즐겨찾기 토글 함수
    setFavorites: React.Dispatch<React.SetStateAction<Cafe[]>>; // 즐겨찾기 설정 함수
    moveCafe: (id: number, direction: "up" | "down") => void; // 카페 이동 함수
};

export default function FavoriteCafeList({
  cafes,
  isEditing,
  selectedIds,
  setSelectedIds,
  toggleFavorite,
  setFavorites,
  moveCafe,
}: Props) {
  const handleCardClick = (id: number) => {
    if (!isEditing) return;
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {cafes.map((cafe) => (
        <div
          key={cafe.id}
          onClick={() => handleCardClick(cafe.id)}
          className={`relative rounded-xl transition cursor-pointer overflow-hidden border ${
            isEditing && selectedIds.includes(cafe.id)
              ? "border-2 border-blue-500 bg-gray-100"
              : "border-transparent bg-white"
          }`}
        >
          {isEditing && (
            <FavoriteSortButtons
              cafe={cafe}
              moveCafe={moveCafe}
            />
          )}
          <FavoriteCafeCard
            name={cafe.name}
            image={cafe.image}
            time={cafe.time}
            location={cafe.location}
            isFavorite={cafe.isFavorite}
            onToggleFavorite={() => toggleFavorite(cafe.id)}
          />
        </div>
      ))}
    </div>
  );
}
