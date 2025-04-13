'use client';

import React from 'react';

interface InputField {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  multiple?: { id: string }[];
}

interface StoreInputFieldProps {
  field: InputField;
  phone: string;
  setPhone: (value: string) => void;
  storeName: string;
  setStoreName: (value: string) => void;
  ownerName: string;
  setOwnerName: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  detailAddress: string;
  setDetailAddress: (value: string) => void;
  businessHours: string;
  setBusinessHours: (value: string) => void;
  menuImages: File[];
  setMenuImages: (files: File[]) => void;
  selectedMenuFiles: string[];
  setSelectedMenuFiles: (files: string[]) => void;
}

const StoreInputField: React.FC<StoreInputFieldProps> = ({
  field,
  phone,
  setPhone,
  storeName,
  setStoreName,
  ownerName,
  setOwnerName,
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  businessHours,
  setBusinessHours,
  menuImages,
  setMenuImages,
  selectedMenuFiles,
  setSelectedMenuFiles,
}) => {
  const formatPhoneNumber: (value: string) => string = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length < 4) return numbers;
    if (numbers.length < 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 10) return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const renderInput = () => {
    switch (field.label) {
      case '상호명':
        return (
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder={field.placeholder}
            className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700"
          />
        );
      case '대표자':
        return (
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder={field.placeholder}
            className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700"
          />
        );
      case '연락처':
        return (
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            placeholder={field.placeholder}
            className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700"
          />
        );
      case '매장 주소':
        return (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={field.placeholder}
            className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700"
          />
        );
      case '상세 주소':
        return (
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder={field.placeholder}
            className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700"
          />
        );
      case '영업 시간':
        return (
          <input
            type="date"
            value={businessHours}
            onChange={(e) => setBusinessHours(e.target.value)}
            className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700"
          />
        );
      case '메뉴 이미지':
        return (
          <div className="flex flex-col gap-y-1 w-full max-w-[400px]">
            {field.multiple?.map((item) => (
              <div key={item.id} className="flex flex-col gap-y-1 w-full max-w-[400px]">
                <label
                  htmlFor={`menu-image-${item.id}`}
                  className="block cursor-pointer rounded-[10px] border border-transparent bg-white p-[10px] text-gray-700 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  {selectedMenuFiles[item.id === 'menu-2' ? 1 : 0] || '파일 선택'}
                </label>
                <input
                  id={`menu-image-${item.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setMenuImages([...menuImages, ...files]);
                    setSelectedMenuFiles([...selectedMenuFiles, ...files.map((file) => file.name)]);
                  }}
                />
              </div>
            ))}
          </div>
        );
      default:
        return <input type={field.type} placeholder={field.placeholder} className="h-[40px] w-full max-w-[400px] rounded-[10px] border border-transparent p-[10px] text-gray-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none placeholder:text-gray-700" />;
    }
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-[30px] sm:flex-nowrap sm:flex-row">
      <label className="flex-[1] text-[17px] font-semibold text-gray-800 sm:min-w-[100px] text-nowrap">
        {field.label}
        {field.label === '메뉴 이미지' && <br />}
        {field.label === '메뉴 이미지' && (
          <span className="text-[14px] text-gray-700">(최대 2장)</span>
        )}
      </label>
      <div className="flex-1">{renderInput()}</div>
    </div>
  );
};

export default StoreInputField;
