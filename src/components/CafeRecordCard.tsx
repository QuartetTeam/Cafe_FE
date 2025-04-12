import Image from "next/image";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface CafeRecordCardProps {
  title: string;
  content: string;
  description?: string;
  imageUrl: string;
  location: string;
  hideTitle?: boolean;
  onClick?: () => void;
}

const CafeRecordCard = ({
  title,
  content,
  description,
  imageUrl,
  location,
  hideTitle,
  onClick,
}: CafeRecordCardProps) => {
  const defaultTitle = "이름 없는 카페";
  const displayTitle = title ? title.trim() : defaultTitle;

  const [cleanedContent, setCleanedContent] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Remove all button elements
    const buttons = doc.querySelectorAll("button");
    buttons.forEach((btn) => btn.remove());

    // Optionally strip all elements except safe ones
    const purified = DOMPurify.sanitize(doc.body.innerHTML, {
      ALLOWED_TAGS: ["p", "b", "i", "strong", "em", "br", "ul", "ol", "li", "span", "a"],
      ALLOWED_ATTR: ["href", "target", "rel"],
    });

    setCleanedContent(purified);
  }, [content]);

  return (
    <div
      className="w-full sm:w-[180px] flex flex-col gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-48 sm:h-[200px] rounded-lg overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl?.trim() || "/next.svg"}
            alt="대표 이미지"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="text-xs sm:text-sm text-black">
        {location || "위치 정보 없음"}
      </div>
      {!hideTitle && (
        <div className="text-sm sm:text-base font-semibold text-black">{displayTitle}</div>
      )}
      <div className="text-xs sm:text-sm text-gray-800">
        {description || "설명이 제공되지 않았습니다."}
      </div>
      {cleanedContent ? (
        <div className="text-black pointer-events-none whitespace-pre-line" dangerouslySetInnerHTML={{ __html: cleanedContent }} />
      ) : (
        <p className="text-sm text-gray-400">내용이 없습니다.</p>
      )}
    </div>
  );
};

export default CafeRecordCard;
