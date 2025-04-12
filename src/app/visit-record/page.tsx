'use client';

import { useState } from 'react';
import CafeRecordCard from "@components/CafeRecordCard";
import VisitRecordHeader from "@components/VisitRecord/VisitRecordHeader";
import Modal from "@components/Modal"; // Import the Modal component
import CafeDetailModal from "@components/CafeDetailModal"; // Import CafeDetailModal component
import { extractRepresentativeImageUrlFromHTML } from "@components/Modal"; // Import the utility function

interface CafeRecord { // Define CafeRecord interface
  imageUrl: string;
  name: string;
  location: string;
  rating: number;
  description: string;
  content: string;
  createdAt: string;
}

export default function VisitRecordPage() {
  const nickname = "";
  const profileImage = "";
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // Split modal visibility into two states
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Split modal visibility into two states
  const [userRecords, setUserRecords] = useState<CafeRecord[]>([]); // New state for user records
  const [selectedRecord, setSelectedRecord] = useState<CafeRecord | null>(null); // Added state for selected record
  const [editingRecord, setEditingRecord] = useState<CafeRecord | null>(null); // New state for editing record

  const cafeRecords: CafeRecord[] = Array.from({ length: 10 }).map((_, i) => ({
    imageUrl: "/next.svg",
    name: nickname,
    location: "서울시 노원구",
    rating: i % 3 + 3,
    description: "이곳은 정말 맛있는 카페입니다.",
    content: "소금빵 맛이 일품임. 겉은 바삭한데 안은 촉촉하고 단팥크림의 정성어린 조합. 집이 노원구라면 반드시 가야하는 가게.", // Added content property
    createdAt: new Date(currentYear, currentMonth, Math.max(1, 10 - i)).toISOString()
  })).filter(record => {
    const recordDate = new Date(record.createdAt);
    return recordDate.getFullYear() === currentYear && recordDate.getMonth() === currentMonth;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleWriteButtonClick = () => {
    setIsWriteModalOpen(true); // Show write modal on button click
  };

  const handleCloseModal = () => {
    setIsWriteModalOpen(false); // Close write modal
    setIsDetailModalOpen(false); // Close detail modal
    setSelectedRecord(null); // Clear selected record
    setEditingRecord(null); // Reset editing record
  };

  const handleSaveRecord = (newRecord: Partial<CafeRecord>) => {
    const extractedImageUrl = extractRepresentativeImageUrlFromHTML(newRecord.content || "");

    const recordToSave: CafeRecord = {
      imageUrl: newRecord.imageUrl?.trim() || extractedImageUrl || "",
      name: newRecord.name?.trim() || "",
      location: newRecord.location || "",
      rating: newRecord.rating || 0,
      description: newRecord.description || "",
      content: newRecord.content || "",
      createdAt: newRecord.createdAt || new Date().toISOString()
    };

    setUserRecords((prevRecords: CafeRecord[]) => {
      const updated = prevRecords.some(record => record.createdAt === recordToSave.createdAt);
      if (updated) {
        return prevRecords.map(record =>
          record.createdAt === recordToSave.createdAt ? recordToSave : record
        );
      } else {
        return [...prevRecords, recordToSave];
      }
    }); // Update user records with new card
  };

  const combinedRecords = [...userRecords, ...cafeRecords]; // Merge userRecords with cafeRecords for display

  return (
  <div className={`pt-[100px] px-10`}>
    {/* Apply blur and darken background when modal is visible */}
    <VisitRecordHeader nickname={nickname} profileImage={profileImage} cafeRecords={combinedRecords} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
    
    <div className="flex justify-end mb-6">
      <button onClick={handleWriteButtonClick} className="px-4 py-2 border rounded-lg text-white font-bold bg-[#7A5C3B] hover:bg-[#6A4D3A]">글쓰기</button>
    </div>
    
    {/* 카드 리스트 */}
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
      {combinedRecords.map((record) => (
        <CafeRecordCard
          key={`${record.createdAt}-${record.name}`}
          imageUrl={record.imageUrl}
          title={record.name.trim() || "이름 없는 카페"}
          location={record.location}
          description={record.description}
          content={record.content}
          onClick={() => {
            console.log("클릭한 카드:", record);
            setSelectedRecord(record);
            setIsDetailModalOpen(true); // Set detail modal on card click
          }}
        />
      ))}
    </section>
  
    {/* Detail Modal Component */}
    {isDetailModalOpen && selectedRecord && (
      <CafeDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        onEdit={() => {
          setEditingRecord(selectedRecord);
          setIsDetailModalOpen(false);
          setIsWriteModalOpen(true);
        }}
        onDelete={() => {
          setUserRecords(prev => prev.filter(record => record.createdAt !== selectedRecord.createdAt));
          setIsDetailModalOpen(false);
        }}
        title={selectedRecord.name}
        content={selectedRecord.content}
        imageUrl={selectedRecord.imageUrl}
        location={selectedRecord.location}
        description={selectedRecord.description}
        createdAt={selectedRecord.createdAt}
      />
    )}

    {/* Write Modal Component */}
    {isWriteModalOpen && (
      <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex justify-center items-center bg-black/40 backdrop-blur-[8px]">
        <Modal isVisible={isWriteModalOpen} onClose={handleCloseModal} onSave={handleSaveRecord} initialData={editingRecord}>
          {/* 글쓰기 폼 콘텐츠를 여기에 추가 */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">카페 기록 작성</h2>
            {/* 작성 폼 내용 예시 */}
          </div>
        </Modal>
      </div>
    )}
  </div>
  );
}