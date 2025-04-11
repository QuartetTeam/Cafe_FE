'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

interface CustomSwiperProps {
  cafes: {
    id: number;
    image: string;
    name: string;
    date: string;
    address: string;
    starCount: string;
    reviewCount: number;
  }[];
}

const CustomSwiper = ({ cafes }: CustomSwiperProps) => {
  return (
    <div className="relative cursor-pointer">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {cafes.map((cafe) => (
          <SwiperSlide key={cafe.id}>
            <div className="flex flex-col gap-y-[5px]">
              <Image src={cafe.image} alt="카페 소개" width={420} height={210} />
              <div className="flex flex-col">
                <span className="font-semibold">{cafe.name}</span>
                <span className="font-semibold">{cafe.date}</span>
                <span>{cafe.address}</span>
                <div className="flex items-center gap-x-[5px]">
                  <span>{cafe.starCount}</span>
                  <span>{cafe.reviewCount}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
