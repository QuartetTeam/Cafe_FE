import React from 'react';
import Link from 'next/link';

const CategoryLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={'w-[80%]'}>
      <div className={'w-[500px]'}>
        <ul className={'flex px-1.5 py-1.5 list-none rounded-md bg-white'}>
          <li className={'flex-auto text-center'}>
            <Link className={'flex items-center justify-start w-full px-0 py-2 text-[20px] font-bold mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-[#714016]'} href="/cafe-list">
              음료
            </Link>
          </li>
          <li className={'flex-auto text-center'}>
            <Link className={'flex items-center justify-start w-full px-0 py-2 text-[20px] font-bold mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              디저트
            </Link>
          </li>
          <li className={'flex-auto text-center'}>
            <Link className={'flex items-center justify-start w-full px-0 py-2 text-[20px] font-bold mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              브런치
            </Link>
          </li>
          <li className={'flex-auto text-center'}>
            <Link className={'flex items-center justify-center w-full px-0 py-2 text-[20px] font-bold mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              분위기
            </Link>
          </li>
        </ul>
      </div>
      <div className={'w-full'}>
        <ul className={'inline-flex px-1.5 py-1.5 list-none rounded-md bg-white'}>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black drop-shadow-2xl bg-[rgba(113,64,22,0.5)]'} href="/cafe-list">
              스페셜티 커피
            </Link>
          </li>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              에스프레소 바
            </Link>
          </li>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              이색음료
            </Link>
          </li>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              디카페인
            </Link>
          </li>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              차
            </Link>
          </li>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              라떼
            </Link>
          </li>
          <li className={'flex text-center'}>
            <Link className={'flex items-center justify-center w-[120px] px-0 py-2 text-[16px] mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-black'} href="/cafe-list">
              기타
            </Link>
          </li>
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CategoryLayout;