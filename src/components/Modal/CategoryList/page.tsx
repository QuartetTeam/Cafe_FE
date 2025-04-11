import { useState } from 'react';

const categoryData = [
  {
    id: 1,
    mainCategory: '음료',
    subCategory: ['스페셜티 커피', '에스프레소 바', '이색음료', '디카페인', '차', '라떼'],
  },
  {
    id: 2,
    mainCategory: '디저트',
    subCategory: ['케이크', '쿠키', '스콘', '도넛', '소금빵', '와플', '아이스크림'],
  },
  {
    id: 3,
    mainCategory: '브런치',
    subCategory: ['샌드위치', '토스트', '팬케이크'],
  },
  {
    id: 4,
    mainCategory: '분위기',
    subCategory: ['카공', '데이트', '테이크아웃', '모임', '대형카페', '감성카페', '이색카페'],
  },
];

const CategoryList = () => {
  const [mainCategory, setMainCategory] = useState<string>('음료');
  const [subCategory, setSubCategory] = useState<string[]>([
    '스페셜티 커피',
    '에스프레소 바',
    '이색음료',
    '디카페인',
    '차',
    '라떼',
  ]);
  const [selectedSub, setSelectedSub] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCategoryClick = (newCategoryItem: string) => {
    setMainCategory(newCategoryItem);
    const selectedCategory = categoryData.find((item) => item.mainCategory === newCategoryItem);
    if (selectedCategory) {
      setSubCategory(selectedCategory.subCategory);
    }
  };

  const handleSubCategoryClick = (newSubCategoryItem: string) => {
    if (selectedSub.includes(newSubCategoryItem)) {
      setSelectedSub(selectedSub.filter((item) => item !== newSubCategoryItem));
    } else {
      setSelectedSub([...selectedSub, newSubCategoryItem]);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60">
        <div className="flex w-[460px] flex-col justify-evenly rounded-[10px] bg-white p-[20px]">
          <h1 className="mb-[27px] text-center text-[25px] font-semibold">분야 선택</h1>
          <ul className="flex justify-around">
            {categoryData.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer px-4 pb-2 text-[20px] ${
                  mainCategory === item.mainCategory
                    ? 'border-b-2 border-black font-semibold text-black'
                    : 'text-gray-400'
                }`}
                onClick={() => handleCategoryClick(item.mainCategory)}
              >
                {item.mainCategory}
              </li>
            ))}
          </ul>
          <div className="mt-[15px] flex min-h-[150px] flex-wrap gap-x-[10px] overflow-y-auto">
            {subCategory.map((item, index) => (
              <button
                key={index}
                className={`max-h-[50px] min-w-[80px] cursor-pointer rounded-[5px] px-4 py-2 ${selectedSub.includes(item) ? 'bg-zinc-300' : 'bg-[#F1F1F1]'}`}
                onClick={() => handleSubCategoryClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="w-full cursor-pointer rounded-[10px] bg-[#595E63] py-[10px] text-[18px] text-white"
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </div>
    )
  );
};

export default CategoryList;
