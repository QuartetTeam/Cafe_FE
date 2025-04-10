'use client';

import { useState } from 'react';
import CafeRecordCard from "@components/CafeRecordCard";
import VisitRecordHeader from "@components/VisitRecord/VisitRecordHeader";
import Modal from "@components/Modal"; // Import the Modal component

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
  const [isModalVisible, setModalVisible] = useState(false); // Added state for modal visibility
  const [userRecords, setUserRecords] = useState<CafeRecord[]>([]); // New state for user records

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
    setModalVisible(true); // Show modal on button click
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
  };

  const handleSaveRecord = (newRecord: Partial<CafeRecord>) => { // Use Partial<CafeRecord> type for newRecord
    const recordToSave: CafeRecord = {
      imageUrl: newRecord.imageUrl || "/default-image.jpg", // Default image URL
      name: newRecord.name && newRecord.name.trim() ? newRecord.name : "이름 없는 카페", // Default name
      location: newRecord.location || "Unknown Location", // Default location
      rating: newRecord.rating || 0, // Default rating
      description: newRecord.description || "No description provided.", // Default description
      content: newRecord.content || "No content provided.", // Default content
      createdAt: newRecord.createdAt || new Date().toISOString() // Default createdAt to now
    };
    setUserRecords(prevRecords => [...prevRecords, recordToSave]); // Update user records with new card
  };

  const combinedRecords = [...cafeRecords, ...userRecords]; // Merge userRecords with cafeRecords for display

  return (
  <div className={`pt-[100px] px-10`}>
    {/* Apply blur and darken background when modal is visible */}
    <VisitRecordHeader nickname={nickname} profileImage={profileImage} cafeRecords={combinedRecords} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
    
    <div className="flex justify-end mb-6">
      <button onClick={handleWriteButtonClick} className="px-4 py-2 border rounded-lg text-white font-bold bg-[#7A5C3B] hover:bg-[#6A4D3A]">글쓰기</button>
    </div>
    
    {/* 카드 리스트 */}
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
      {combinedRecords.map((record, i) => (
        <CafeRecordCard
          key={i}
          imageUrl={record.imageUrl}
          title={record.name.trim() || "이름 없는 카페"}
          location={record.location}
          description={record.description}
          content={record.content}
        />
      ))}
    </section>
  
    {/* Modal Component */}
    {isModalVisible && (
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
        <Modal isVisible={isModalVisible} onClose={handleCloseModal} onSave={handleSaveRecord}>
          <div className="flex justify-between">
            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded">닫기</button>
            <button onClick={() => { /* Save logic here */ }} className="px-4 py-2 bg-blue-500 text-white rounded">저장</button>
          </div>
        </Modal> {/* Use Modal component */}
      </div>
    )}
  </div>
  );
}