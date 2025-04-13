import { useEffect } from 'react';
import { extractRepresentativeImageUrlFromHTML } from './utils';

export const useImageEditor = (
  editorRef: React.RefObject<HTMLDivElement>,
  representativeImage: string,
  setRepresentativeImage: (url: string) => void,
  enableSetRepresentative = false
) => {
  useEffect(() => {
    updateRepresentativeButtonStyles();

    if (enableSetRepresentative && editorRef.current) {
      const buttons = editorRef.current.querySelectorAll('button');
      buttons.forEach((btn) => {
        if (btn.textContent === '대표') {
          const wrapper = btn.closest('.group');
          const img = wrapper?.querySelector('img');
          if (img?.src) {
            btn.onclick = () => setRepresentativeImage(img.src);
          }
        }
      });
    }
  }, [representativeImage]);

  const insertImage = (url: string) => {
    if (!editorRef.current) return;
    const img = document.createElement('img');
    img.src = url;
    img.alt = '';
    img.className = 'mb-2';

    const wrapper = document.createElement('div');
    wrapper.className = 'relative inline-block group';

    const representativeButton = createRepresentativeButton(url);
    const captionInput = createCaptionInput();

    wrapper.appendChild(img);
    wrapper.appendChild(representativeButton);
    wrapper.appendChild(captionInput);

    editorRef.current.appendChild(wrapper);
  };

  const createRepresentativeButton = (url: string) => {
    const button = document.createElement('button');
    button.textContent = '대표';
    button.className = `absolute top-1 left-1 z-10 px-2 py-1 text-xs text-white bg-[#A0522D] rounded opacity-0 group-hover:opacity-100`;
    button.onclick = () => setRepresentativeImage(url);
    return button;
  };

  const createCaptionInput = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '사진 설명 입력';
    input.className = 'mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm';
    return input;
  };

  const updateRepresentativeButtonStyles = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      if (btn.textContent === '대표') {
        const wrapper = btn.closest('.group') as HTMLElement | null;
        if (!wrapper) return;

        const img = wrapper.querySelector('img') as HTMLImageElement | null;
        if (img?.src === representativeImage) {
          wrapper.style.border = '2px solid #A0522D';
        } else {
          wrapper.style.border = 'none';
        }
      }
    });
  };

  return { insertImage };
};
