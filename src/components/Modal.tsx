import { useEffect } from 'react';
import React, { useState } from 'react';
import CafeRecordCard from './CafeRecordCard';
import Image from 'next/image';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (record: CafeRecord) => void; // onSave prop 추가
  children?: React.ReactNode;
}

interface CafeRecord {
  title: string;
  content: string;
  description?: string; // description을 선택적으로 변경
  imageUrl: string;
  location: string;
  hideTitle?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSave }) => {
  if (!isVisible) return null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState(''); // 설명은 비워둘 수 있음
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [representativeImageUrl, setRepresentativeImageUrl] = useState<string>(''); // 대표 이미지에 대한 새로운 상태
  const [imageCaptions, setImageCaptions] = useState<string[]>([]); // 이미지 캡션에 대한 새로운 상태
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // 선택된 이미지 인덱스 상태 추가

  useEffect(() => {
    document.querySelectorAll('button').forEach((btn) => {
      if (btn.textContent === '대표') {
        const parentDiv = btn.parentElement;
        const image = parentDiv?.querySelector('img') as HTMLImageElement;
        if (image?.src === representativeImageUrl) {
          btn.style.backgroundColor = '#7A5C3B';
          btn.style.color = 'white';
        } else {
          btn.style.backgroundColor = 'transparent';
          btn.style.color = 'white';
        }
      }
    });
  }, [representativeImageUrl]);

  // 이미지 업로드를 처리하고 URL과 캡션을 저장
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls: string[] = [];
      const newImageCaptions: string[] = [];
      for (let i = 0; i < files.length && i < 50; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        newImageUrls.push(url);
        newImageCaptions.push(''); // 캡션을 빈 문자열로 초기화
      }
      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
      setImageCaptions((prevCaptions) => [...prevCaptions, ...newImageCaptions]);
    }
  };

  // contentEditable 영역에 이미지를 삽입하고 캡션 입력 필드 추가
  const insertImage = (url: string, index: number) => {
    const contentEditable = document.getElementById('contentEditable');
    if (contentEditable) {
      contentEditable.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        const imgWrapper = document.createElement('div');
        imgWrapper.contentEditable = 'false';
        imgWrapper.style.position = 'relative';
        imgWrapper.style.display = 'inline-block';
        imgWrapper.style.resize = 'both';
        imgWrapper.style.overflow = 'auto';
        imgWrapper.style.textAlign = 'center';

        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%'; // 추가: 이미지 최대 너비 설정
        img.style.display = 'block'; // 추가: 이미지 블록으로 설정
        img.draggable = true;
        img.onclick = () => {
          setSelectedImageIndex(selectedImageIndex === index ? null : index); // 클릭 시 선택 상태 토글
        };
        img.ondragstart = (e) => {
          if (e.dataTransfer) {
            e.dataTransfer.setData('text/plain', url);
          }
        };

        // 대표 이미지 설정 버튼
        const representativeButton = document.createElement('button');
        representativeButton.textContent = '대표';
        representativeButton.className = 'absolute top-1 left-1 text-white text-xs px-2 py-1 rounded-md transition';
        representativeButton.style.zIndex = '10';
        representativeButton.style.backgroundColor = url === representativeImageUrl ? '#7A5C3B' : 'transparent';
        representativeButton.style.color = url === representativeImageUrl ? 'white' : 'white';
        representativeButton.onclick = (e) => {
          e.preventDefault();
          setRepresentativeImageUrl(url);
        };

        // 이미지 캡션 입력 필드
        const captionInput = document.createElement('input');
        captionInput.type = 'text';
        captionInput.placeholder = '설명 추가';
        captionInput.value = ''; // 초기화 추가
        captionInput.className = "text-black placeholder-black"; // 클래스 추가
        captionInput.style.width = '100%';
        captionInput.style.boxSizing = 'border-box';
        captionInput.style.textAlign = 'center';
        captionInput.style.marginTop = '4px';
        captionInput.value = imageCaptions[index] || '';
        captionInput.oninput = (e) => {
          const target = e.currentTarget as HTMLInputElement;
          setImageCaptions((prev) => {
            const updated = [...prev];
            updated[index] = target.value;
            return updated;
          });
        };

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(representativeButton);
        // resizeHandle 관련 코드 제거
        imgWrapper.appendChild(captionInput);

        // 이미지 다음에 올 텍스트 노드 준비
        const trailingText = document.createTextNode('\u00A0');

        // range 삽입 순서 조정
        range.insertNode(imgWrapper);
        range.insertNode(trailingText);
        range.setStartAfter(trailingText);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);

        setContent(contentEditable.innerHTML);
        
        setImageUrls((prevUrls) => [...prevUrls, url]);
        if (imageUrls.length === 0) {
          setRepresentativeImageUrl(url);
        }
      }
    }
  };

  // 카페 기록을 저장하는 기능 구현
  const handleSave = () => { // handleSave 함수 구현
    const cafeRecord: CafeRecord = {
      title: title?.trim() ? title : '이름 없는 카페',
      content: content || '내용이 없습니다.',
      description: description || '설명이 제공되지 않았습니다.', // 기본 설명 업데이트
      imageUrl: representativeImageUrl || imageUrls[0] || '', // 대표 이미지 URL 사용
      location: location || '위치 정보 없음',
    };
    onSave(cafeRecord); // 새로운 기록을 onSave에 전달
    onClose(); // 저장 후 모달 닫기
  };

  // 이미지 삭제를 위한 keydown 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parent = range.startContainer.parentNode as HTMLElement;
        if (parent && parent.nodeName === 'DIV' && parent.contentEditable === 'false') {
          e.preventDefault();
          parent.remove();
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh] w-full md:w-[600px]" style={{ paddingBottom: '20px'}}>
        <h2 className="text-lg font-bold mb-6 text-black">카페 일지 작성</h2>
        <input 
          type="text" 
          placeholder="제목을 입력해주세요" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
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
              const index = imageUrls.length;
              insertImage(url, index);
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
        <div className="relative min-h-[200px]" onKeyDown={handleKeyDown}>
          {content === '' && (
            <span className="absolute left-2 font-semibold top-2 text-gray-500 pointer-events-none">
              내용을 입력해주세요
            </span>
          )}
          <div 
            id="contentEditable"
            className="min-h-[200px] p-2 border rounded-lg w-full font-semibold text-black"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)} // 상태 업데이트를 innerHTML로 변경
          >
          </div>
        </div>
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