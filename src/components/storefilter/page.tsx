'use client';
import {useState} from 'react';

const CategoryData = [
  {
    id: 1,
    mainCategory: '음료',
    subCategory: ['스페셜티 커피', '에스프레소 바', '이색음료', '디카페인', '차', '라떼']
  },
  {
    id: 2,
    mainCategory: '디저트',
    subCategory: ['케이크', '쿠키', '스콘', '도넛', '소금빵', '와플', '아이스크림']
  },
  {
    id: 3,
    mainCategory: '브런치',
    subCategory: ['샌드위치', '토스트', '팬케이크']
  },
  {
    id: 4,
    mainCategory: '분위기',
    subCategory: ['카공', '데이트', '테이크아웃', '모임', '대형카페', '감성카페', '이색카페']
  }
]

const CategoryLayout = ({
  children,
  onClose,
  setSelectedFilter,
  selectedFilter,
}: {
  children?: React.ReactNode;
  onClose?: () => void;
  setSelectedFilter?: (value: { main: string; sub: string }[]) => void;
  selectedFilter?: { main: string; sub: string }[];
}) => {
  const [mainCategory, setMainCategory] = useState<string>('음료');
  const [subCategory, setSubCategory] = useState<string[]>(['스페셜티 커피']);
  const [subCategoryList, setSubCategoryList] = useState<string[]>(['스페셜티 커피', '에스프레소 바', '이색음료', '디카페인', '차', '라떼', '기타']);
  const [selectedCategory, setSelectedCategory] = useState<{ main: string, sub: string }[]>([]);

  const handleMainCategoryChange: (newMainCategory: string) => void = (newMainCategory) => {
    if (newMainCategory !== mainCategory) {
      const selectedCategory = CategoryData.find(category => category.mainCategory === newMainCategory);
      if (selectedCategory) {
        setMainCategory(newMainCategory);
        setSubCategoryList(selectedCategory.subCategory);
        setSubCategory([selectedCategory.subCategory[0] || '']);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {selectedCategory.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategory.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-[rgba(113,64,22,0.1)] text-[#714016] px-3 py-1 rounded-full text-sm"
            >
              {item.main} &gt; {item.sub}
              <button
                onClick={() => {
                  const updated = selectedCategory.filter((_, i) => i !== index);
                  setSelectedCategory(updated);
                  setSelectedFilter?.(updated);
                }}
                className="ml-2 text-[#714016] hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="w-full max-w-[500px] bg-white rounded-lg p-6 relative mx-4 z-50">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-black font-bold"
          >
            ✕
          </button>
        )}
        <div className="w-full max-w-[500px]">
          <ul className={'flex list-none rounded-md bg-white'}>
            {CategoryData.map((category) => (
              <li key={category.id} className={'flex-auto text-center'}>
                <button
                  className={`flex items-center justify-start w-full px-0 py-2 text-[20px] font-bold mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${mainCategory === category.mainCategory ? 'text-[#714016]' : 'text-black'}`}
                  onClick={() => handleMainCategoryChange(category.mainCategory)}
                >
                  {category.mainCategory}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={'w-full h-[46px] flex justify-between'}>
          <ul className={'relative inline-flex list-none rounded-md bg-white overflow-x-auto max-w-full whitespace-nowrap gap-2'}>
            {subCategoryList.map((sub) => (
              <li key={sub} className={'relative flex text-center'}>
                <div
                    className={`absolute bottom-0 left-0 w-full h-[2px] transition-all ease-in-out duration-300 ${
                        subCategory.includes(sub) ? 'bg-[rgba(113,64,22,0.5)]' : 'bg-transparent'
                    }`}
                />
                <button
                  className={`flex items-center justify-center min-w-[80px] px-2 py-2 text-[16px] mb-0 cursor-pointer drop-shadow-2xl rounded-md ${
                    subCategory.includes(sub) ? 'bg-[rgba(113,64,22,0.15)] text-[#714016] font-semibold' : 'text-black'
                  }`}
                  onClick={() => {
                    setSubCategory(prev =>
                      prev.includes(sub)
                        ? prev.filter(item => item !== sub)
                        : [...prev, sub]
                    );
                  }}
                >
                  {sub}
                </button>
              </li>
            ))}
          </ul>
          <div
            className="flex items-center justify-center w-[60px] px-0 py-2 text-[16px] mb-0 rounded-md cursor-pointer shadow-2xl bg-[rgba(113,64,22,0.5)] text-black whitespace-nowrap ml-4"
            onClick={() => {
              const newEntry = { main: mainCategory, sub: subCategory.join(', ') };
              const nextSelection = [...selectedCategory, newEntry];
              setSelectedCategory(nextSelection);
              setSelectedFilter?.(nextSelection);
              onClose?.();
            }}
          >
            필터
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setSelectedCategory([]);
              setSelectedFilter?.([]);
              setMainCategory('음료');
              const defaultCategory = CategoryData.find(c => c.mainCategory === '음료');
              setSubCategoryList(defaultCategory?.subCategory || []);
              setSubCategory([]);
            }}
            className="text-sm text-gray-500 underline"
          >
            선택 초기화
          </button>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default CategoryLayout;