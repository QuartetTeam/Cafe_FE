'use client';
import Image from 'next/image';
import searchIcon from '@images/search_icon.svg';
import Link from 'next/link';

import CustomSwiper from '@components/swiper/page';

const categoryfields = [
  { id: 1, src: searchIcon, alt: '음료' },
  { id: 2, src: searchIcon, alt: '디저트 / 베이커리' },
  { id: 3, src: searchIcon, alt: '브런치' },
  { id: 4, src: searchIcon, alt: '무드' },
];

const CafesExamples = [
  {
    id: 1,
    image: '/next.svg',
    name: '카페 A',
    address: '부산 서면',
    date: '10:00~12:00',
    starCount: '⭐⭐⭐⭐⭐',
    reviewCount: 99,
  },
  {
    id: 2,
    image: '/next.svg',
    name: '카페 B',
    address: '부산 광안리',
    date: '10:00~12:00',
    starCount: '⭐⭐⭐⭐⭐',
    reviewCount: 99,
  },
  {
    id: 3,
    image: '/next.svg',
    name: '카페 C',
    address: '부산 해운대',
    date: '10:00~12:00',
    starCount: '⭐⭐⭐⭐⭐',
    reviewCount: 99,
  },
  {
    id: 4,
    image: '/next.svg',
    name: '카페 C',
    address: '부산 해운대',
    date: '10:00~12:00',
    starCount: '⭐⭐⭐⭐⭐',
    reviewCount: 99,
  },
  {
    id: 5,
    image: '/next.svg',
    name: '카페 C',
    address: '부산 해운대',
    date: '10:00~12:00',
    starCount: '⭐⭐⭐⭐⭐',
    reviewCount: 99,
  },
  {
    id: 6,
    image: '/next.svg',
    name: '카페 C',
    address: '부산 해운대',
    date: '10:00~12:00',
    starCount: '⭐⭐⭐⭐⭐',
    reviewCount: 99,
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-y-[60px] px-[100px] py-[50px]">
      <div className="relative">
        <input
          placeholder="어떤 카페를 찾고 있나요?"
          type="text"
          className="w-full rounded-[20px] px-[20px] py-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="검색"
          width={18}
          height={16}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        />
      </div>
      <section className="flex items-center justify-around">
        {categoryfields.map((field) => (
          <div key={field.id} className="flex flex-col items-center gap-y-[15px]">
            <Link href="/">
              <Image src={field.src} alt={field.alt} width={200} height={200} />
            </Link>
            <span className="text-[18px]">{field.alt}</span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-y-[20px]">
        <span className="text-[20px] font-semibold">지금, 인기있는 카페</span>
        <CustomSwiper cafes={CafesExamples} />
      </section>
      <section className="flex flex-col gap-y-[20px]">
        <span className="text-[20px] font-semibold">지금, 가장 가까운 카페</span>
        <CustomSwiper cafes={CafesExamples} />
      </section>
      <section className="flex flex-col gap-y-[20px]">
        <span className="text-[20px] font-semibold">지금, 많이 보는 카페일지</span>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="rounded-[20px] bg-white p-4 shadow-lg hover:scale-110 cursor-pointer">
              <Image
                src={'/next.svg'}
                alt="일지 소개"
                width={300}
                height={200}
                className="rounded-[20px]"
              />
              <div className="mt-3 flex flex-col">
                <div className="flex items-center gap-x-[6px]">
                  <Image src={'/next.svg'} alt="작성자 프로필" width={20} height={20} />
                  <span className="font-semibold">작성자 {i + 1}</span>
                </div>
                <span className="font-semibold">카페 이름 {i + 1}</span>
                <span>주소</span>
                <span>별 갯수</span>
                <span>일지 내용 일부...</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
