'use client';

import React from 'react';

interface FilterSectionProps {
  selectedFilter: { main: string; sub: string }[];
  setSelectedFilter: React.Dispatch<React.SetStateAction<{ main: string; sub: string }[]>>;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  appendSelectedFilter: (newSelection: { main: string; sub: string }[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedFilter,
  setSelectedFilter,
  setShowFilter,
  isExpanded,
  setIsExpanded,
}) => {
  const handleClear: () => void = () => {
    localStorage.removeItem('selectedFilter');
    setSelectedFilter([]);
  };

  return (
    <>
      {['분야', '옵션'].map((label) => (
        <div key={label} className="mt-[10px] flex flex-row items-center gap-[12px]">
          <span className="text-[15px] font-semibold text-gray-800 whitespace-nowrap">{label}</span>
          <span className="text-[14px] font-semibold text-gray-700 whitespace-nowrap">(중복 가능)</span>
          <button
            className="w-[80px] cursor-pointer rounded-[20px] bg-[#846245] px-[5px] py-[8px] text-white"
            onClick={() => setShowFilter(true)}
          >
            선택
          </button>
          <button
            className="w-[80px] cursor-pointer rounded-[20px] bg-[#aaa] px-[5px] py-[8px] text-white"
            onClick={handleClear}
          >
            초기화
          </button>
          {Array.isArray(selectedFilter) && selectedFilter.length > 0 && (
            <div className="flex-1 overflow-hidden">
              <div
                className={`text-[14px] text-[#714016] ${
                  isExpanded ? '' : 'truncate max-w-[500px]'
                } inline-block`}
              >
                {selectedFilter.map((f) => `${f.main} > ${f.sub}`).join(' | ')}
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-sm text-blue-500 underline whitespace-nowrap"
              >
                {isExpanded ? '접기' : '펼치기'}
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default FilterSection;
