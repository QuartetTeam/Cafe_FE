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
    <div className="rounded-xl bg-gray-200 p-6 relative w-full">
      <span
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 cursor-pointer"
        title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        {isFavorite ? "❤️" : "🖤"}
      </span>
      <div className="mb-4 h-40 bg-gray-300 rounded flex items-center justify-center text-sm text-gray-500">
        {image ? <img src={image} alt={`${name} 대표 이미지`} className="h-full w-full object-cover rounded" /> : "카페 대표 이미지"}
      </div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-700">{time}</p>
      <p className="text-sm text-gray-500">{location}</p>
    </div>
  );
}
