'use client';

import React from 'react';
import Image from 'next/image';

interface RepresentativeImageUploaderProps {
    representativeImage: string | null;
    setRepresentativeImage: (image: string) => void;
}
  
const RepresentativeImageUploader: React.FC<RepresentativeImageUploaderProps> = ({
    representativeImage,
    setRepresentativeImage,
}) => {
    const handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setRepresentativeImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="flex flex-col items-center gap-y-[10px]">
        <Image src={representativeImage || '/next.svg'} alt="대표 이미지" width={360} height={240} />
        <div className="flex flex-col items-center gap-y-[7px]">
          <span className="text-[18px] text-gray-800">대표 이미지</span>
          <input
            type="file"
            id="representativeImageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            className="w-[80px] cursor-pointer rounded-[20px] bg-[#846245] px-[5px] py-[8px] font-bold text-white"
            onClick={() => document.getElementById('representativeImageInput')?.click()}
          >
            찾기
          </button>
        </div>
      </div>
    );
};
  
export default RepresentativeImageUploader;