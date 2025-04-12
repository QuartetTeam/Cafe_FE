import { useEffect } from 'react';
import React, { useState } from 'react';
import CafeRecordCard from './CafeRecordCard';
import Image from 'next/image';

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

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onSave, onDelete, initialData }) => {
  if (!isVisible) return null;

  const [name, setName] = useState(initialData?.name || ''); // Changed title to name
  const [content, setContent] = useState(initialData?.content || '');
  const [description, setDescription] = useState(initialData?.description || ''); // 설명은 비워둘 수 있음
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [location, setLocation] = useState(initialData?.location || '');
  const [representativeImageUrl, setRepresentativeImageUrl] = useState(initialData?.imageUrl || ''); // 대표 이미지에 대한 새로운 상태
  const [imageCaptions, setImageCaptions] = useState<string[]>([]); // 이미지 캡션에 대한 새로운 상태
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // 선택된 이미지 인덱스 상태 추가

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setLocation(initialData.location || '');
      setDescription(initialData.description || '');
      setContent(initialData.content || '');
    }

    const contentEditable = document.getElementById('contentEditable');
    if (contentEditable && initialData?.content) {
      contentEditable.innerHTML = '';
      setTimeout(() => {
        contentEditable.innerHTML = initialData.content || '';
        const tempDoc = new DOMParser().parseFromString(initialData.content || '', "text/html");
        const imgs = tempDoc.querySelectorAll("img");
        const urls: string[] = [];
        imgs.forEach((img) => {
          const src = img.getAttribute("src");
          if (src) {
            urls.push(src);
          }
        });
        setImageUrls(urls);
        setRepresentativeImageUrl(initialData.imageUrl || urls[0] || '');
        document.querySelectorAll('button').forEach((btn) => {
          if (btn.textContent === '대표') {
            const wrapper = btn.parentElement;
            const img = wrapper?.querySelector('img') as HTMLImageElement;
            const url = img?.src;
            btn.onclick = (e) => {
              e.preventDefault();
              if (url) {
                setRepresentativeImageUrl(url);
              }
            };
          }
        });
      }, 0);
    }
  }, [initialData]);

  useEffect(() => {
    document.querySelectorAll('button').forEach((btn) => {
      if (btn.textContent === '대표') {
        const parentDiv = btn.parentElement;
        const image = parentDiv?.querySelector('img') as HTMLImageElement;
        if (image?.src && representativeImageUrl && image.src === representativeImageUrl) {
          btn.classList.add("bg-[#7A5C3B]");
        } else {
          btn.classList.remove("bg-[#7A5C3B]");
        }
      }
    });
  }, [representativeImageUrl, imageUrls]);

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

  const updateRepresentativeButtonStyles = (currentUrl: string) => {
    document.querySelectorAll('button').forEach((btn) => {
      if (btn.textContent === '대표') {
        const image = btn.parentElement?.querySelector('img') as HTMLImageElement;
        if (image?.src?.includes(currentUrl)) {
          btn.classList.add("bg-[#7A5C3B]");
        } else {
          btn.classList.remove("bg-[#7A5C3B]");
        }
      }
    });
  };

  // contentEditable 영역에 이미지를 삽입하고 캡션 입력 필드 추가
  const insertImage = (url: string, index: number) => {
    // Prevent inserting the same image more than once
    const contentEditable = document.getElementById('contentEditable');
    if (contentEditable?.innerHTML.includes(url)) return;
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
        imgWrapper.style.pointerEvents = 'auto'; // Allow buttons inside to be clickable

        const img = document.createElement('img'); // next/image는 DOM 직접 조작에 사용할 수 없음
        img.src = url;
        img.alt = "업로드된 이미지";
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
        const currentUrl = url;
        const representativeButton = document.createElement('button');
        representativeButton.textContent = '대표';
        representativeButton.className = 'absolute top-1 left-1 text-white text-xs px-2 py-1 rounded-md transition';
        representativeButton.style.zIndex = '9999';
        representativeButton.style.pointerEvents = 'auto'; // Ensure button is clickable
        if (representativeImageUrl && url && representativeImageUrl === url) {
          representativeButton.classList.add("bg-[#7A5C3B]");
        } else {
          representativeButton.classList.remove("bg-[#7A5C3B]");
        }
        representativeButton.onclick = (e) => {
          e.preventDefault();
          setRepresentativeImageUrl(currentUrl);
          setTimeout(() => updateRepresentativeButtonStyles(currentUrl), 0);
        };

        // 이미지 캡션 입력 필드
        const captionInput = document.createElement('input');
        captionInput.type = 'text';
        captionInput.placeholder = '설명을 입력하세요.';
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
        imgWrapper.appendChild(captionInput);

        // 이미지 다음에 올 텍스트 노드 준비
        const trailingText = document.createTextNode('\u00A0');

        // range 삽입 순서 조정
        range.insertNode(trailingText);
        range.insertNode(imgWrapper);
        range.setStartAfter(imgWrapper);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);

        setContent(contentEditable.innerHTML);

        // Prevent pushing duplicate image URLs during initial load
        if (!imageUrls.includes(url)) {
          setImageUrls((prevUrls) => [...prevUrls, url]);
        }
      }
    }
  };

  // 카페 기록을 저장하는 기능 구현
  const handleSave = () => {
    const contentEditable = document.getElementById('contentEditable');
    if (contentEditable) {
      // 저장 전 현재 contentEditable 내용을 최신화
      const inputs = contentEditable.querySelectorAll('input');
      inputs.forEach((input) => {
        input.setAttribute('value', input.value); // Ensure value is stored in HTML
        input.removeAttribute('disabled');
        input.removeAttribute('readonly');
        input.style.pointerEvents = 'auto';
      });

      // Ensure the latest content is retrieved after value is set
      const updatedContent = contentEditable.innerHTML;
      setContent(updatedContent);
    }

    const cafeRecord: CafeRecord = {
      name: name?.trim() || '',
      content: document.getElementById('contentEditable')?.innerHTML || '',
      description: description || '',
      imageUrl: representativeImageUrl || imageUrls[0] || '',
      location: location || '',
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSave(cafeRecord);
    onClose();
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
              insertImage(url, imageUrls.length + 0); // Updated index to use current image count
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

export const extractRepresentativeImageUrlFromHTML = (html: string): string => {
  if (typeof window === "undefined") return "/next.svg"; // SSR 대응

  const doc = new DOMParser().parseFromString(html, "text/html");
  const repButton = Array.from(doc.querySelectorAll("button")).find((btn) =>
    btn.textContent?.includes("대표")
  );
  const repImg = repButton?.closest("div")?.querySelector("img");
  return repImg?.getAttribute("src") || "/next.svg";
};

export default Modal;