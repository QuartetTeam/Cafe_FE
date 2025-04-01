import React from 'react';
import Image from "next/image";
import CafeImage from "@images/cafefoods.jpg"
import FilledHeart from "@images/heart-fill.png"
import Bread from "@images/bread.png"
import Arrow from "@images/arrow-right.png"
import Profile from "@images/profile.png"

const CafeDetail = () => {
    return (
        <>
            <div className={'flex flex-col w-[70%] gap-8'}>
                <section className={'w-full flex justify-between gap-12'}>
                    <article className={'flex flex-col justify-start gap-4 max-w-[30%]'}>
                        <h1 className={'text-[28px] font-bold text-[#714016]'}>소담소담</h1>
                        <p className={'text-[16px]'}>평일 09시-22시 주말 10-17시</p>
                        <p className={'text-[16px]'}>서울시 노원구 00동 00로, 00-0</p>
                        <div className={'flex justify-between'}>
                            <div className={'flex gap-2 items-center'}>
                                <p>★★★★★</p>
                                <p className={'text-[12px]'}>126</p>
                            </div>
                            <div className={'flex gap-2 items-center'}>
                                <Image src={FilledHeart} alt={'FilledHeart'} className={'w-5 h-5'}/>
                                <p className={'text-[12px]'}>99</p>
                            </div>
                        </div>
                        <p className={'text-[16px]'}>안녕하세요 소담소담입니다. 저희 카페는 매일매일 신선한 재료로 정성껏 만든 음식을 제공합니다.</p>
                        <div className={'flex gap-2'}>
                            <div className={'bg-amber-200 rounded-md px-2 text-[14px]'}># 스페셜티</div>
                            <div className={'bg-blue-200 rounded-md px-2 text-[14px]'}># 소금빵</div>
                            <div className={'bg-pink-200 rounded-md px-2 text-[14px]'}># 감성카페</div>
                        </div>
                    </article>
                    <Image src={CafeImage} alt={'CafeImage'} className={'w-[70%] min-w-[300px] rounded-[15px]'}/>
                </section>
                <p className={'border-b-1 border-[rgba(113,64,22,0.5)]'}></p>
                <section className={'flex flex-col gap-4'}>
                    <div className={'flex justify-between items-center'}>
                        <h1 className={'text-[20px] font-bold'}>사장님 게시글</h1>
                        <p className={'flex gap-1'}>게시글 모두 보기 <Image src={Arrow} alt={'arrow'} className={'w-5 h-5'}/></p>
                    </div>
                    <article className={'flex gap-2'}>
                        <div className={'flex flex-col gap-2 w-[235px]'}>
                            <Image src={Bread} alt={'bread'} className={'h-[313px]'}/>
                            <p className={'flex gap-4 px-[3px] cursor-pointer bg-white drop-shadow-md text-14'}>소담소담 오픈 & 댓글 이벤트
                                <Image src={Arrow} alt={'arrow'} className={'w-5 h-5'}/>
                            </p>
                        </div>
                        <div className={'flex flex-col gap-2 w-[235px]'}>
                            <Image src={Bread} alt={'bread'} className={'h-[313px]'}/>
                            <p className={'flex gap-4 px-[3px] cursor-pointer bg-white drop-shadow-md text-14'}>소담소담 오픈 & 댓글 이벤트
                                <Image src={Arrow} alt={'arrow'} className={'w-5 h-5'}/>
                            </p>
                        </div>
                        <div className={'flex flex-col gap-2 w-[235px]'}>
                            <Image src={Bread} alt={'bread'} className={'h-[313px]'}/>
                            <p className={'flex gap-4 px-[3px] cursor-pointer bg-white drop-shadow-md text-14'}>소담소담 오픈 & 댓글 이벤트
                                <Image src={Arrow} alt={'arrow'} className={'w-5 h-5'}/>
                            </p>
                        </div>
                    </article>
                </section>
                <p className={'border-b-1 border-[rgba(113,64,22,0.5)]'}></p>
                <section className={'flex flex-col gap-12'}>
                    <div className={'flex justify-between items-center'}>
                        <h1 className={'text-[20px] font-bold'}>리뷰 391</h1>
                        <p className={'flex gap-1 cursor-pointer'}>리뷰 모두 보기 <Image src={Arrow} alt={'arrow'} className={'w-5 h-5'}/></p>
                    </div>
                    <article>
                        <div className={'flex justify-between px-4 py-8'}>
                            <div className={'flex gap-2 w-[80%]'}>
                                <Image src={Profile} alt={'profile'} className={'w-[32px] h-[32px]'}/>
                                <div className={'relative flex flex-col gap-4'}>
                                    <div>
                                        <div className={'flex gap-2 items-baseline'}>
                                            <p className={'text-[16px] font-bold'}>닉네임</p>
                                            <p className={'text-[12px] font-light'}>2025.03.14</p>
                                        </div>
                                        <p className={'text-[14px]'}>★★★★★</p>
                                        <p className={'text-[14px]'}>대형 카페라 자리도 많고 사장님 친절하세요. 소금빵이랑 라떼 맛집입니다. 화장실 깨끗하고 반려견 동반 가능해서 좋았어요! </p>
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
                        <p className={'border-b-1 mx-4 border-gray-200'}></p>
                        <div className={'flex justify-between px-4 py-8'}>
                            <div className={'flex gap-2 w-[80%]'}>
                                <Image src={Profile} alt={'profile'} className={'w-[32px] h-[32px]'}/>
                                <div className={'relative flex flex-col gap-4'}>
                                    <div>
                                        <div className={'flex gap-2 items-baseline'}>
                                            <p className={'text-[16px] font-bold'}>닉네임</p>
                                            <p className={'text-[12px] font-light'}>2025.03.14</p>
                                        </div>
                                        <p className={'text-[14px]'}>★★★★★</p>
                                        <p className={'text-[14px]'}>대형 카페라 자리도 많고 사장님 친절하세요. 소금빵이랑 라떼 맛집입니다. 화장실 깨끗하고 반려견 동반 가능해서 좋았어요! </p>
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
                        <p className={'border-b-1 mx-4 border-gray-200'}></p>
                        <div className={'flex justify-between px-4 py-8'}>
                            <div className={'flex gap-2 w-[80%]'}>
                                <Image src={Profile} alt={'profile'} className={'w-[32px] h-[32px]'}/>
                                <div className={'relative flex flex-col gap-4'}>
                                    <div>
                                        <div className={'flex gap-2 items-baseline'}>
                                            <p className={'text-[16px] font-bold'}>닉네임</p>
                                            <p className={'text-[12px] font-light'}>2025.03.14</p>
                                        </div>
                                        <p className={'text-[14px]'}>★★★★★</p>
                                        <p className={'text-[14px]'}>대형 카페라 자리도 많고 사장님 친절하세요. 소금빵이랑 라떼 맛집입니다. 화장실 깨끗하고 반려견 동반 가능해서 좋았어요! </p>
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
                        <p className={'border-b-1 mx-4 border-gray-200'}></p>
                    </article>
                </section>
            </div>
        </>
    );
};

export default CafeDetail;