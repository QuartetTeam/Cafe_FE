import Image from 'next/image';

const inputfields = [
  { id: 1, label: '상호명', type: 'text', placeholder: '상호명을 입력해주세요.' },
  { id: 2, label: '대표자', type: 'text', placeholder: '대표자를 입력해주세요.' },
  { id: 3, label: '연락처', type: 'tel', placeholder: '연락처를 입력해주세요.' },
  { id: 4, label: '매장 주소', type: 'address', placeholder: '매장 주소를 입력해주세요.' },
  { id: 5, label: '상세 주소', type: 'address', placeholder: '매장의 상세 주소를 입력해주세요.' },
  { id: 6, label: '영업 시간', type: 'date', placeholder: '매장의 영업 시간을 입력해주세요.' },
  {
    id: 7,
    label: '메뉴 이미지',
    type: 'file',
    placeholder: '매장의 메뉴 사진을 업로드 해주세요.',
    multiple: 2,
  },
];

export default function registerPage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-y-[40px] p-[50px]">
      <div>
        <h1 className="text-[30px]">매장을 등록해주세요!</h1>
      </div>
      <div className="flex items-center justify-between">
        <section className="flex flex-col gap-y-[30px]">
          <Image src={'/next.svg'} alt="대표 이미지" width={450} height={300} />
          <div className="flex flex-col items-center gap-y-[7px]">
            <span className="text-[18px]">대표 이미지</span>
            <input type="file" className="hidden" />
            <button className="w-[80px] cursor-pointer rounded-[20px] bg-[#846245] px-[5px] py-[8px] font-bold text-white">
              찾기
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-y-[15px]">
          {inputfields.map((field) => (
            <div key={field.id} className="flex items-center gap-[30px]">
              <label className="flex-[1] text-[17px] font-semibold">
                {field.label}
                {field.id === 7 && <br />}
                {field.id === 7 && <span className="text-[14px] text-gray-500">(최대 2장)</span>}
              </label>
              {field.type === 'file' && field.multiple ? (
                <div className="flex flex-col gap-y-[7px]">
                  {Array.from({ length: field.multiple }, (_, i) => (
                    <input
                      key={i}
                      className="h-[40px] w-[400px] rounded-[10px] border border-transparent p-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none"
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  ))}
                </div>
              ) : (
                <input
                  className="h-[40px] w-[400px] rounded-[10px] border border-transparent p-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus:border-[#c56e14] focus:outline-none"
                  type={field.type}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <div className="mt-[20px] border-b border-dotted border-black"></div>
          <div className="mt-[10px] flex gap-[60px]">
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold">분야</span>
              <span className="text-[14px] font-semibold text-gray-500">(중복 가능)</span>
            </div>
            <button className="w-[80px] cursor-pointer rounded-[20px] bg-[#846245] px-[5px] py-[8px] text-white">
              선택
            </button>
          </div>
          <div className="mt-[10px] flex gap-[60px]">
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold">옵션</span>
              <span className="text-[14px] font-semibold text-gray-500">(중복 가능)</span>
            </div>
            <button className="w-[80px] cursor-pointer rounded-[20px] bg-[#846245] px-[5px] py-[8px] text-white">
              선택
            </button>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-center gap-x-[20px]">
        <button className="h-full w-[180px] cursor-pointer rounded-[20px] px-[5px] py-[8px] font-semibold text-[#C1C1C1] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ">
          다음에 할게요
        </button>
        <button className="h-full w-[120px] cursor-pointer rounded-[20px] bg-[#C56E14] px-[5px] py-[8px] font-semibold text-white">
          완료
        </button>
      </div>
    </div>
  );
}
