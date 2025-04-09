type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

import Image from "next/image";

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-nowrap justify-center gap-3 mb-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`flex flex-col items-center justify-center w-24 h-28 sm:w-28 sm:h-32 rounded-md bg-white hover:bg-gray-100 transition text-sm font-medium shadow text-black ${
              selected === category ? 'shadow-inner border border-gray-400' : ''
            }`}
          >
            <Image
              src="/image/search.png"
              alt="category icon"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 mt-2"
            />
            <span className="mt-2">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
