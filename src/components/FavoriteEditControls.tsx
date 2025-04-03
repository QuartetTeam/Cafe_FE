// 편집 모드에서의 버튼 ( 전체 선택, 취소, 삭제 )
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
    <div className="flex items-center justify-end mb-2 mt-4">
      {!isEditing ? (
        <button
          onClick={onClick}
          className="text-sm px-3 py-1 bg-yellow-100 rounded text-black"
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
            className="px-3 py-1 bg-gray-500 text-white rounded"
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
            className="px-3 py-1 bg-blue-500 text-white rounded"
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
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
