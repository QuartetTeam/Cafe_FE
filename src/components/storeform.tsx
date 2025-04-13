'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import StoreFilterModal from '@components/storefilter/page';
import { inputfields } from '@components/constants/storeFormFields';
import RepresentativeImageUploader from '@components/storeform/RepresentativeImageUploader';
import StoreInputField from '@components/storeform/StoreInputField';
import FilterSection from '@components/storeform/FilterSection';

const RegisterPage: React.FC = () => {
  const [representativeImage, setRepresentativeImage] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [menuImages, setMenuImages] = useState<File[]>([]);
  const [selectedMenuFiles, setSelectedMenuFiles] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{ main: string; sub: string }[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('selectedFilter');
    if (stored) {
      setSelectedFilter(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));
  }, [selectedFilter]);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length < 4) return numbers;
    if (numbers.length < 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 10) return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSave = () => {
    const storeData = {
      storeName,
      ownerName,
      phone,
      address,
      detailAddress,
      businessHours,
      menuImages,
      selectedMenuFiles,
      representativeImage,
      selectedFilter,
    };
    console.log('저장된 매장 정보:', storeData);
    // 여기에 API 요청 또는 localStorage 저장 등을 추가할 수 있습니다.
  };

  const appendSelectedFilter = (newSelection: { main: string; sub: string }[]) => {
    setSelectedFilter((prev) => {
      const updated = [...prev];
      newSelection.forEach((newItem) => {
        const existingIndex = updated.findIndex(
          (item) => item.main === newItem.main
        );
        if (existingIndex !== -1) {
          const currentSubs = updated[existingIndex].sub.split(',').map(s => s.trim());
          const newSubs = newItem.sub.split(',').map(s => s.trim());
          const merged = Array.from(new Set([...currentSubs, ...newSubs]));
          updated[existingIndex].sub = merged.join(', ');
        } else {
          updated.push(newItem);
        }
      });
      return updated;
    });
  };

  if (showFilter) {
    return (
      <StoreFilterModal
        onClose={() => setShowFilter(false)}
        selectedFilter={selectedFilter}
        setSelectedFilter={appendSelectedFilter}
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-y-[40px] p-[20px] sm:p-[50px] pt-[80px] overflow-x-hidden">
      <div>
        <h1 className="text-[30px] text-gray-800">매장 정보 수정</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-x-[40px] w-full overflow-x-hidden">
        <section className="flex flex-col items-center gap-y-[15px] w-full lg:w-auto">
          <RepresentativeImageUploader 
            representativeImage={representativeImage} 
            setRepresentativeImage={setRepresentativeImage} 
          />
        </section>

        <section className="flex flex-col gap-y-[15px] w-full lg:w-auto">
          {inputfields.map((field) => (
            <StoreInputField 
              key={field.id} 
              field={field} 
              phone={phone} 
              setPhone={setPhone} 
              storeName={storeName} 
              setStoreName={setStoreName} 
              ownerName={ownerName} 
              setOwnerName={setOwnerName} 
              address={address} 
              setAddress={setAddress} 
              detailAddress={detailAddress} 
              setDetailAddress={setDetailAddress} 
              businessHours={businessHours} 
              setBusinessHours={setBusinessHours} 
              menuImages={menuImages} 
              setMenuImages={setMenuImages} 
              selectedMenuFiles={selectedMenuFiles} 
              setSelectedMenuFiles={setSelectedMenuFiles} 
            />
          ))}
          <div className="mt-[20px] border-b border-dotted border-black"></div>
          <FilterSection 
            selectedFilter={selectedFilter} 
            setShowFilter={setShowFilter} 
            setSelectedFilter={setSelectedFilter} 
            isExpanded={isExpanded} 
            setIsExpanded={setIsExpanded} 
            appendSelectedFilter={appendSelectedFilter} 
          />
        </section>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="h-full w-[120px] cursor-pointer rounded-[20px] bg-[#C56E14] px-[5px] py-[8px] font-semibold text-white"
          onClick={handleSave}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;