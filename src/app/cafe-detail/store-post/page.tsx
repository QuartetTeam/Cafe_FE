'use client'
import React, {useState} from 'react';
import Image from "next/image";
import Bread from "@images/bread.png"
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const StorePost = () => {
    const [comment, setComment] = useState("");
    const router = useRouter();

    return (
        <div className={'flex flex-col gap-4'}>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => router.back()}
                    className={'text-gray-500 hover:text-black transition cursor-pointer'}
                    aria-label="뒤로가기"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-[24px] font-bold">사장님 말씀</h1>
            </div>
            <section className={'flex w-[70%] justify-between gap-8'}>
                <Image src={Bread} alt={'bread'} className={'w-[40%]'}/>
                <article className={'w-[60%] flex flex-col justify-between'}>
                    <div className={'flex flex-col gap-4'}>
                        <h2 className={'text-[18px] font-bold'}>소담소담 오픈 & 댓글 이벤트 진행 중</h2>
                        <p className={'text-[14px]'}>안녕하세요~ 로스터리 카페 소담소담 입니다. 지난 3월 16일 오픈하였습니다! 오픈 이벤트로 커피 구매 후 해당 게시글에게 댓글을 달아주신 모든 분께 커피 원두 100g을 드립니다.</p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            {/* 프로필 이미지 */}
                            <Image src={Bread} alt={'bread'} className="h-10 w-10 rounded-full object-cover"/>
                            {/* 입력창과 아이콘들 */}
                            <div className="flex-1">
                        <textarea
                            className="w-full resize-none border-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
                            rows={2}
                            placeholder="Add your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                                <div className="mt-2 flex items-center justify-end">
                                    <button
                                        className="rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-700 transition cursor-pointer"
                                        disabled={!comment.trim()}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                </article>
            </section>
            <section className={'flex flex-col gap-6 pt-20'}>
                <h2 className={'text-[18px] font-bold'}>댓글</h2>
                <div className={'flex flex-col gap-1'}>
                    <div className={'flex gap-4'}>
                        <p className={'text-[14px] font-bold'}>닉네임</p>
                        <p className={'text-[14px]'}>댓글을 달았습니다.</p>
                    </div>
                    <div className={'flex gap-4'}>
                        <p className={'text-[14px] font-bold'}>닉네임</p>
                        <p className={'text-[14px]'}>오늘 방문했는데 커피 너무 맛있고 분위기 좋았습니다~ 자주 올게요. </p>
                    </div>
                    <div className={'flex gap-4'}>
                        <p className={'text-[14px] font-bold'}>닉네임</p>
                        <p className={'text-[14px]'}>댓글을 달았습니다.</p>
                    </div>
                    <div className={'flex gap-4'}>
                        <p className={'text-[14px] font-bold'}>닉네임</p>
                        <p className={'text-[14px]'}>오늘 방문했는데 커피 너무 맛있고 분위기 좋았습니다~ 자주 올게요. </p>
                    </div>
                    <div className={'flex gap-4'}>
                        <p className={'text-[14px] font-bold'}>닉네임</p>
                        <p className={'text-[14px]'}>댓글을 달았습니다.</p>
                    </div>
                    <div className={'flex gap-4'}>
                        <p className={'text-[14px] font-bold'}>닉네임</p>
                        <p className={'text-[14px]'}>오늘 방문했는데 커피 너무 맛있고 분위기 좋았습니다~ 자주 올게요. </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StorePost;