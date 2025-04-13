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

const FavoriteSortButtons = ({ cafe, moveCafe }: Props) => {
  return (
    <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-0.5 sm:gap-1 text-xs sm:text-sm md:text-base font-semibold text-[#B0703A]">
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
};

export default FavoriteSortButtons;
