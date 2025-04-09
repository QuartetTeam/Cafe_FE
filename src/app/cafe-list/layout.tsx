'use client';
import {useState} from 'react';
import Link from 'next/link';

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

const CategoryLayout = ({children}: {children: React.ReactNode}) => {
  const [mainCategory, setMainCategory] = useState<string>('음료');
  const [subCategory, setSubCategory] = useState<string>('스페셜티 커피');
  const [subCategoryList, setSubCategoryList] = useState<string[]>(['스페셜티 커피', '에스프레소 바', '이색음료', '디카페인', '차', '라떼', '기타']);
  const handleMainCategoryChange = (newMainCategory: string) => {
    if (newMainCategory !== mainCategory) {
      const selectedCategory = CategoryData.find(category => category.mainCategory === newMainCategory);
      if (selectedCategory) {
        setMainCategory(newMainCategory);
        setSubCategoryList(selectedCategory.subCategory);
        setSubCategory(selectedCategory.subCategory[0] || '');
      }
    }
  };
  return (
    <div className={'w-[80%]'}>
      <div className={'w-[500px]'}>
        <ul className={'flex list-none rounded-md bg-white'}>
          {CategoryData.map((category) => (
              <li key={category.id}
                  className={'flex-auto text-center'}
                  onClick={() => {
                    handleMainCategoryChange(category.mainCategory)
                  }}
              >
                <Link className={`flex items-center justify-start w-full px-0 py-2 text-[20px] font-bold mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${mainCategory==category.mainCategory?`text-[#714016]`:`text-black`}`} href="/cafe-list">
                  {category.mainCategory}
                </Link>
              </li>
          ))}
        </ul>
      </div>
      <div className={'w-full h-[46px] flex justify-between'}>
        <ul className={'relative inline-flex list-none rounded-md bg-white'}>
          {subCategoryList.map((sub) => (
              <li key={sub}
                  className={'relative flex text-center'}
                    onClick={() => {
                        setSubCategory(sub)
                    }}
              >
                <div
                    className={`absolute bottom-0 left-0 w-full h-[2px] transition-all ease-in-out duration-300 ${
                        subCategory === sub ? 'bg-[rgba(113,64,22,0.5)]' : 'bg-transparent'
                    }`}
                />
                <Link
                    className={`flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 cursor-pointer text-black drop-shadow-2xl`}                    href="/cafe-list">
                  {sub}
                </Link>
              </li>
          ))}
        </ul>
        <div className={'flex items-center justify-center w-[60px] px-0 py-2 text-[16px] mb-0 rounded-md cursor-pointer shadow-2xl bg-[rgba(113,64,22,0.5)] text-black'}>
          필터
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CategoryLayout;