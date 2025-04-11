import {ChangeEvent, useRef, useState} from "react";
import Bread from "@images/bread.png"
import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewModalProps {
    onClose: () => void;
}

const ReviewModal = ({onClose}: ReviewModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={'fixed inset-0 z-50 flex items-center justify-center bg-black/40'}>
            <div className={'relative flex items-center justify-center bg-white px-6 py-10 rounded-md'}>
                <button
                    onClick={onClose}
                    className={'absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer'}
                >
                    ✕
                </button>
                <div className={'flex w-full max-w-6xl gap-10'}>
                    {/* 왼쪽 이미지 등록 박스 */}
                    <div className={'flex flex-col items-center'}>
                        <div className={'flex h-[400px] w-[400px] items-center justify-center rounded-md bg-gray-200 text-3xl text-gray-500 cursor-pointer'}
                             onClick={handleImageClick}>
                            {image ? (
                                <img
                                    src={image}
                                    alt="Uploaded preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                "+"
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            // name={'image_URL'}
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className={'hidden'}
                        />
                        <button className={'mt-4 rounded-full bg-white px-6 py-2 text-sm shadow-md hover:bg-gray-100'}>
                            등록
                        </button>
                    </div>

                    {/* 오른쪽 정보 및 입력 영역 */}
                    <div className={'flex flex-1 flex-col'}>
                        {/* 상점 정보 */}
                        <div className={'mb-2 text-sm font-semibold'}>소담소담</div>
                        <div className={'mb-4 text-sm text-gray-500'}>서울 00시 00구 00로, 00-00</div>

                        {/* 사용자 정보 */}
                        <div className={'mb-4 flex items-center gap-2'}>
                            <Image src={Bread} alt={'bread'} className={'h-8 w-8 rounded-full object-cover'}/>
                            <span className={'text-sm text-gray-700'}>000 님</span>
                        </div>

                        {/* 별점 */}
                        <div className={'mb-6 flex items-center gap-1 text-sm text-gray-700'}>
                            별점
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="#000" stroke="#000" />
                            ))}
                        </div>

                        {/* 제목 입력 */}
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={'mb-4 w-full rounded-md border border-gray-200 p-3 text-sm placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300'}
                        />

                        {/* 내용 입력 */}
                        <textarea
                            rows={5}
                            placeholder="내용을 입력해주세요."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={'mb-6 w-full rounded-md border resize-none border-gray-200 p-3 text-sm placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300'}
                        />

                        {/* 완료 버튼 */}
                        <button className={'self-end rounded-full bg-orange-600 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition cursor-pointer'} onClick = {onClose}>
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;