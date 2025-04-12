import React, { useEffect } from "react";
import Modal from "./Modal";

interface CafeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  imageUrl: string;
  location: string;
  description: string;
  createdAt: string;
  onSave?: (updatedContent: string) => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const CafeDetailModal = ({
  isOpen,
  onClose,
  title,
  content,
  imageUrl,
  location,
  description,
  createdAt,
  onSave,
  onDelete,
  onEdit,
}: CafeDetailModalProps) => {
  useEffect(() => {
    // removed editing logic
  }, [content]);

  const getCleanContent = (html: string): string => {
    if (typeof window === "undefined") return html;

    const doc = new DOMParser().parseFromString(html, "text/html");

    // Remove 대표 버튼
    doc.querySelectorAll("button").forEach((btn) => {
      if (btn.textContent?.includes("대표")) {
        btn.remove();
      }
    });

    // Replace caption inputs with static spans preserving the value
    doc.querySelectorAll("input").forEach((input) => {
      const captionValue = input.value || input.getAttribute("value") || "";
      const span = document.createElement("span");
      span.textContent = captionValue;
      span.style.display = "block";
      span.style.textAlign = "center";
      span.style.marginTop = "4px";
      input.replaceWith(span);
    });

    return doc.body.innerHTML;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex justify-center items-center bg-black/60 backdrop-blur-[8px]">
      <div className="bg-white p-6 sm:p-8 rounded w-full max-w-md sm:max-w-xl md:max-w-2xl relative max-h-[90vh] overflow-y-auto pt-16">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-3 py-1 bg-amber-700 text-white rounded z-10"
        >
          닫기
        </button>
        <h2 className="mt-4 font-bold text-lg text-black">{title || "이름 없는 카페"}</h2>
        <p className="text-xs text-gray-500">
          작성일: {new Date(createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">{location || "위치 정보 없음"}</p>
        <p
          className="text-sm text-gray-800 select-none pointer-events-none"
          aria-readonly="true"
        >
          {description || "설명이 제공되지 않았습니다."}
        </p>

        {content ? (
          <div
            className="mt-2 text-black text-sm"
            dangerouslySetInnerHTML={{ __html: getCleanContent(content) }}
          />
        ) : (
          <p className="mt-2 text-gray-400 text-sm">내용이 없습니다.</p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onEdit}
            className="px-4 py-1 bg-amber-700 text-white rounded"
          >
            수정
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-1 bg-red-500 text-white rounded"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeDetailModal;