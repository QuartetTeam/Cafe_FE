import React from 'react';
import Image from 'next/image';
import CafeImage from '@images/cafe-sample.jpg';

const CafeCard = () => {
  return (
    <article className={'w-80 h-90 flex flex-col gap-4 cursor-pointer'}>
      <Image src={CafeImage} alt={'Cafe Image'} className={'rounded-xl'} />
      <div className={'flex flex-col'}>
        <p className={'text-[17px] font-bold'}>소담소담</p>
        <p className={'text-[16px]'}>평일 09시-22시 주말 10-17시</p>
        <p className={'text-[16px]'}>서울시 노원구</p>
        <p className={'text-[16px]'}>★★★★★</p>
        <div className={'flex gap-2'}>
          <div className={'bg-amber-200 rounded-md px-2 text-[16px]'}># 스페셜티</div>
          <div className={'bg-blue-200 rounded-md px-2 text-[16px]'}># 소금빵</div>
          <div className={'bg-pink-200 rounded-md px-2 text-[16px]'}># 감성카페</div>
        </div>
      </div>
    </article>
  );
};

export default CafeCard;