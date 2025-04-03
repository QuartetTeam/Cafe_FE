import React from "react";

type FavoriteCafeCardProps = {
  name: string;
  image?: string;
  time: string;
  location: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function FavoriteCafeCard({
  name,
  image,
  time,
  location,
  isFavorite,
  onToggleFavorite,
}: FavoriteCafeCardProps) {
  return (
    <div className="rounded-xl bg-white shadow-md relative w-full p-2 sm:p-4 overflow-hidden">
      <span
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 cursor-pointer z-10"
        title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        {isFavorite ? "❤️" : "🖤"}
      </span>
      <div className="h-28 sm:h-36 bg-gray-300">
        <img
          src={image || "/next.svg"}
          alt={`${name} 대표 이미지`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-2 sm:p-4">
        <h2 className="text-base sm:text-lg font-semibold text-black">{name}</h2>
        <p className="text-xs sm:text-sm text-gray-700">{time}</p>
        <p className="text-xs sm:text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
}
