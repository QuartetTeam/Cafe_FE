'use client'

import React, { useState } from "react";
import Pagination from "@components/cafe-detail/Pagination";
import Image from "next/image";
import Profile from "@images/profile.png";
import Bread from "@images/bread.png";
import FilledHeart from "@images/heart-fill.png";

const PAGE_SIZE = 5;

interface Review {
    id: string;
    author: string;
    date: string;
    starRating: number;
    content: string;
}

const mockReviews: Review[] = Array.from({ length: 37 }, (_, i) => ({
    id: String(i + 1),
    author: `닉네임 ${i + 1}`,
    date: `2025.03.${String((i % 30) + 1).padStart(2, "0")}`,
    starRating: 5,
    content:
        "대형 카페라 자리도 많고 사장님 친절하세요. 소금빵이랑 라떼 맛집입니다. 화장실 깨끗하고 편리한 애견 동반 가능석도 좋았어요!",
}));

const ReviewSection = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalCount = mockReviews.length;
    const paginatedReviews = mockReviews.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className={'flex flex-col gap-12'}>
            <div className={'flex justify-between items-center'}>
                <h1 className={'text-[20px] font-bold'}>리뷰 {totalCount}</h1>
                <button className={'text-[16px] text-right text-gray-600 hover:underline cursor-pointer'}>
                    내 리뷰 작성하기 +
                </button>
            </div>

            <ul className='space-y-6 px-4'>
                {paginatedReviews.map((review) => (
                    <li key={review.id} className={'flex flex-col justify-between gap-4'}>
                        <div className={'flex gap-4 justify-between'}>
                            <div className={'flex gap-2 w-[80%]'}>
                                <Image src={Profile} alt={'profile'} className={'w-[32px] h-[32px]'}/>
                                <div className={'relative flex flex-col gap-4'}>
                                    <div>
                                        <div className={'flex gap-2 items-baseline'}>
                                            <p className={'text-[16px] font-bold'}>{review.author}</p>
                                            <p className={'text-[12px] font-light'}>{review.date}</p>
                                        </div>
                                        <div className="mt-1 text-yellow-500 text-sm">
                                            {"⭐".repeat(review.starRating)}
                                            {"☆".repeat(5 - review.starRating)}
                                        </div>
                                        <p className={'text-[14px]'}>{review.content}</p>
                                    </div>
                                    <div className={'absolute bottom-2 flex gap-2'}>
                                        <div className={'bg-orange-300 rounded-md px-2 text-[14px]'}># 카페라떼</div>
                                        <div className={'bg-blue-200 rounded-md px-2 text-[14px]'}># 소금빵</div>
                                        <div className={'bg-green-200 rounded-md px-2 text-[14px]'}># 대형카페</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col items-center'}>
                                <Image src={Bread} alt={'bread'} className={'w-[101px] h-[134px]'}/>
                                <p className={'flex items-center'}><Image src={FilledHeart} alt={'heart'} className={'w-5 h-5'}/>99</p>
                            </div>
                        </div>
                        <p className={'border-b-1 border-gray-200'}></p>
                    </li>
                ))}
            </ul>

            <div className={'mt-6'}>
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={PAGE_SIZE}
                    onPageChange={(page:number) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default ReviewSection;