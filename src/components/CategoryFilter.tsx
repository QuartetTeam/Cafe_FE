type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`flex flex-col items-center justify-center w-28 h-32 rounded-md bg-white hover:bg-gray-100 transition text-sm font-medium shadow text-black ${
              selected === category ? 'shadow-inner border border-gray-400' : ''
            }`}
          >
            <img
              src="/search.png"
              alt="category icon"
              className="w-12 h-12 mt-2"
            />
            <span className="mt-2">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
