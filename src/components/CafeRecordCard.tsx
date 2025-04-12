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
}

const CafeRecordCard = ({
  title,
  content,
  description,
  imageUrl,
  location,
  hideTitle,
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
    <div className="w-full sm:w-[180px] flex flex-col gap-2">
      <div className="relative w-full h-48 sm:h-[200px] rounded-lg overflow-hidden">
        {imageUrl?.trim() ? (
          <div className="relative w-full h-48">
            <Image
              src={imageUrl}
              alt={"이미지 없음"}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-black rounded-lg">
            <span className="">이미지 없음</span>
          </div>
        )}
      </div>
      <div className="text-xs sm:text-sm text-black">{location}</div>
      {!hideTitle && (
        <div className="text-sm sm:text-base font-semibold text-black">{displayTitle}</div>
      )}
      <div className="text-black" dangerouslySetInnerHTML={{ __html: cleanedContent }} />
    </div>
  );
};

export default CafeRecordCard;
