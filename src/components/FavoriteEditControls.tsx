import React from "react";
import { Cafe } from "../types";

type Props = {
  onClick: () => void;
  isEditing: boolean;
  selectedIds: number[];
  favorites: Cafe[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFavorites: React.Dispatch<React.SetStateAction<Cafe[]>>;
};

export default function FavoriteEditControls({
  onClick,
  isEditing,
  selectedIds,
  favorites,
  setSelectedIds,
  setIsEditing,
  setFavorites,
}: Props) {
  return (
    <div className="flex flex-wrap justify-between items-start gap-2 mb-2 mt-4 px-2 sm:px-4 md:px-6">
      <div className="flex justify-end w-full md:w-auto">
        {!isEditing ? (
          <button
            onClick={onClick}
            className="text-xs sm:text-sm md:text-base px-3 py-1 bg-yellow-100 rounded text-black whitespace-nowrap"
          >
            편집하기
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedIds([]);
              }}
              className="text-xs sm:text-sm md:text-base px-3 py-1 bg-gray-500 text-white rounded"
            >
              취소
            </button>
            <button
              onClick={() => {
                if (selectedIds.length === favorites.length) {
                  setSelectedIds([]);
                } else {
                  setSelectedIds(favorites.map((cafe) => cafe.id));
                }
              }}
              className="text-xs sm:text-sm md:text-base px-3 py-1 bg-blue-500 text-white rounded"
            >
              {selectedIds.length === favorites.length ? "전체 해제" : "전체 선택"}
            </button>
            <button
              onClick={() => {
                setFavorites((prev) =>
                  prev.filter((cafe) => !selectedIds.includes(cafe.id))
                );
                setSelectedIds([]);
                setIsEditing(false);
              }}
              className="text-xs sm:text-sm md:text-base px-3 py-1 bg-red-500 text-white rounded"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
