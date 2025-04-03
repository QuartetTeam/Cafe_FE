// 순서 조정 버튼 (위로, 아래로) - 개별 카드 적용
import React from "react";

type Cafe = {
  id: number;
  name: string;
  image: string;
  time: string;
  location: string;
  isFavorite: boolean;
};

type Props = {
  cafe: Cafe;
  moveCafe: (id: number, direction: "up" | "down") => void; // 전체 favorites 배열 기준으로 동작
};

export default function FavoriteSortButtons({ cafe, moveCafe }: Props) {
  return (
    <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1 text-sm font-semibold text-blue-700">
      <button
        onClick={(e) => {
          e.stopPropagation();
          moveCafe(cafe.id, "up");
        }}
      >
        ▲
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          moveCafe(cafe.id, "down");
        }}
      >
        ▼
      </button>
    </div>
  );
}
