import { useEffect, useRef } from 'react';
import React, { useState } from 'react';
import CafeRecordCard from '../CafeRecordCard';
import Image from 'next/image';
import { extractRepresentativeImageUrlFromHTML } from './utils';
import { useImageEditor } from './useImageEditor';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (record: CafeRecord) => void;
  onDelete?: () => void; // 🆕 add this
  children?: React.ReactNode;
  initialData?: CafeRecord | null; // ✅ ensure this is included and typed
}

interface CafeRecord {
  name: string; // Changed from title to name
  content: string;
  description?: string; // description을 선택적으로 변경
  imageUrl: string;
  location: string;
  hideTitle?: boolean;
  createdAt?: string; // 추가된 createdAt 속성
}

const Modal = ({ isVisible, onClose, onSave, onDelete, initialData }: ModalProps) => {
  if (!isVisible) return null;

  const [name, setName] = useState(initialData?.name || ''); // Changed title to name
  const [content, setContent] = useState(initialData?.content || '');
  const [description, setDescription] = useState(initialData?.description || ''); // 설명은 비워둘 수 있음
  const [location, setLocation] = useState(initialData?.location || '');
  const [representativeImageUrl, setRepresentativeImageUrl] = useState(initialData?.imageUrl || ''); // 대표 이미지에 대한 새로운 상태
  const editorRef = useRef<HTMLDivElement>(null!) as React.RefObject<HTMLDivElement>;
  const { insertImage } = useImageEditor(editorRef, representativeImageUrl, setRepresentativeImageUrl, true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setLocation(initialData.location || '');
      setDescription(initialData.description || '');
      setContent(initialData.content || '');
    }

    const contentEditable = editorRef.current;
    if (contentEditable && initialData?.content) {
      contentEditable.innerHTML = '';
      setTimeout(() => {
        contentEditable.innerHTML = initialData.content || '';
      }, 0);
    }
  }, [initialData]);

  const handleSave = () => {
    const contentEditable = editorRef.current;
    if (contentEditable) {
      const inputs = contentEditable.querySelectorAll('input');
      inputs.forEach((input) => {
        input.setAttribute('value', input.value); // Ensure value is stored in HTML
        input.removeAttribute('disabled');
        input.removeAttribute('readonly');
        input.style.pointerEvents = 'auto';
      });

      const updatedContent = contentEditable.innerHTML;
      setContent(updatedContent);
    }

    const cafeRecord: CafeRecord = {
      name: name?.trim() || '',
      content: document.getElementById('contentEditable')?.innerHTML || '',
      description: description || '',
      imageUrl: representativeImageUrl || '',
      location: location || '',
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSave(cafeRecord);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[5000] flex items-center justify-center bg-black/50 backdrop-blur-[8px] pointer-events-auto">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh] w-full max-w-md sm:max-w-xl md:max-w-2xl" style={{ paddingBottom: '20px' }}>
        <h2 className="text-lg font-bold mb-6 text-black">카페 일지 작성</h2>
        <input 
          type="text" 
          placeholder="이름을 입력해주세요" // Changed placeholder from 제목 to 이름
          value={name} // Changed title to name
          onChange={(e) => setName(e.target.value)} // Changed setTitle to setName
          className="mb-4 p-2 border rounded-lg w-full font-semibold text-black placeholder-gray-500"
        />
        <input 
          type="text" 
          placeholder="위치를 입력해주세요" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="mb-4 p-2 border rounded-lg w-full font-semibold text-black placeholder-gray-500"
        />
        <button onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            const files = target.files;
            if (files) {
              const url = URL.createObjectURL(files[0]);
              insertImage(url);
            }
          };
          input.click();
        }} className="mb-4 p-2 border rounded-lg text-white font-bold bg-[#7A5C3B] hover:bg-[#6A4D3A]">
          이미지 삽입
        </button>
        <div className="mb-4">
          <textarea 
            placeholder="설명을 입력해주세요" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="min-h-[60px] p-2 border rounded-lg w-full font-semibold text-black placeholder-gray-500"
          />
        </div>
        <div className="relative min-h-[200px]">
          {content === '' && (
            <span className="absolute left-2 font-semibold top-2 text-gray-500 pointer-events-none">
              내용을 입력해주세요
            </span>
          )}
          <div 
            ref={editorRef}
            id="contentEditable"
            className="min-h-[200px] p-2 border rounded-lg w-full font-semibold text-black relative z-0"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)} // 상태 업데이트를 innerHTML로 변경
          >
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg text-white font-bold bg-red-500 hover:bg-red-600">
              닫기
            </button>
            {onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="px-4 py-2 border rounded-lg text-white font-bold bg-gray-600 hover:bg-gray-700"
              >
                삭제
              </button>
            )}
          </div>
          <button onClick={handleSave} className="px-4 py-2 border rounded-lg text-white font-bold bg-[#7A5C3B] hover:bg-[#6A4D3A]">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;