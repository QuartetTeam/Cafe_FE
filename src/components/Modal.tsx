import React, { useState } from 'react';
import CafeRecordCard from './CafeRecordCard';
import Image from 'next/image';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (record: CafeRecord) => void; // Added onSave prop
  children?: React.ReactNode;
}

interface CafeRecord {
  title: string;
  content: string;
  description?: string; // Made description optional
  imageUrl: string;
  location: string;
  hideTitle?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSave }) => {
  if (!isVisible) return null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState(''); // Description can be left blank
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [representativeImageUrl, setRepresentativeImageUrl] = useState<string>(''); // New state for representative image

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls: string[] = [];
      for (let i = 0; i < files.length && i < 50; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        newImageUrls.push(url);
      }
      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
    }
  };

  const handleSave = () => { // Implementing handleSave function
    const cafeRecord: CafeRecord = {
      title: title?.trim() ? title : '이름 없는 카페',
      content: content || '내용이 없습니다.',
      description: description || '설명이 제공되지 않았습니다.', // Updated default description
      imageUrl: representativeImageUrl || imageUrls[0] || '', // Use the representative image URL
      location: location || '위치 정보 없음',
    };
    onSave(cafeRecord); // Pass the new record to onSave
    onClose(); // Close the modal after saving
  };

  const cafeRecords: CafeRecord[] = imageUrls.map((url) => ({
    title: title?.trim() ? title : '이름 없는 카페',
    content,
    description, // Description can be empty
    imageUrl: url,
    location,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh] w-full md:w-[600px]" style={{ paddingBottom: '20px'}}>
        <h2 className="text-lg font-bold mb-6 text-black">카페 일지 작성</h2>
        <input 
          type="text" 
          placeholder="제목을 입력해주세요" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="mb-4 p-2 border rounded-lg w-full font-semibold text-black"
        />
        <input 
          type="text" 
          placeholder="위치를 입력해주세요" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="mb-4 p-2 border rounded-lg w-full font-semibold text-black"
        />
        <div className="mb-4">
          <label className="font-semibold">
            <span className="inline-block p-2 border rounded-lg text-white cursor-pointer bg-[#7A5C3B] hover:bg-[#6A4D3A] font-semibold">
              사진 선택
            </span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden"
              multiple
            />
          </label>
        </div>
        <div className="mb-10">
          <textarea 
            placeholder="설명을 입력해주세요" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="min-h-[60px] p-2 border rounded-lg w-full font-semibold text-black"
          />
        </div>
        <div className="mb-12">
          <textarea 
            placeholder="내용을 입력해주세요" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="min-h-[200px] p-2 border rounded-lg w-full font-semibold text-black"
          />
        </div>
        {cafeRecords.map((record, index) => (
          <div key={index}>
            <CafeRecordCard title={record.title} content={record.content} description={record.description} imageUrl={record.imageUrl} location={record.location} hideTitle={true} />
            <button onClick={() => setRepresentativeImageUrl(record.imageUrl)} className="mt-2 px-2 py-1 border rounded-lg text-white font-bold bg-[#7A5C3B] hover:bg-[#6A4D3A]">
              대표 이미지로 설정
            </button>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-white font-bold bg-red-500 hover:bg-red-600">
            닫기
          </button>
          <button onClick={handleSave} className="px-4 py-2 border rounded-lg text-white font-bold bg-[#7A5C3B] hover:bg-[#6A4D3A]">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;