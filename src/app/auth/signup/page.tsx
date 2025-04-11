'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

const roleOptions = ['사장님', '일반 회원'];
const inputfields = [
  {
    label: '이메일/아이디',
    type: 'email',
    placeholder: '이메일 형식으로 입력해주세요.',
  },
  {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호는 6자리 이상이어야 하며 영문과 숫자를 반드시 포함해야 합니다.',
  },
  {
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 한 번 입력해주세요.',
  },
  {
    label: '전화번호',
    type: 'tel',
    placeholder: '전화번호를 입력해주세요.',
  },
];

const SignupPage = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {step === 1 && (
        <div className="flex min-h-screen items-center justify-center gap-x-[170px]">
          {roleOptions.map((option) => (
            <button
              key={option}
              className="h-[370px] w-[375px] cursor-pointer rounded-[100%] border border-[#714016]"
              onClick={() => {
                setSelectedRole(option);
                setStep(2);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-y-[30px] px-[48px] pt-[130px]">
        {step === 2 && (
          <>
            <div className="flex flex-col items-center gap-y-[7px]">
              <Image src={'/next.svg'} alt="로고 예시" width={200} height={200} />
              <h1>첫 방문을 환영해요!</h1>
            </div>
            <form className="flex w-full flex-col gap-[13px]">
              {inputfields.map((field, index) => (
                <div key={index} className="flex flex-col gap-y-[5px]">
                  <div className="flex items-center gap-x-[5px]">
                    <label className="text-[16px] font-medium">{field.label}</label>
                    <span className="text-[20px] text-red-500">*</span>
                  </div>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full rounded-[5px] border border-[#7d7d7d] p-[10px] focus:border-[#c56e14] focus:outline-none"
                  />
                </div>
              ))}
            </form>
            <button
              type="button"
              className="w-[120px] cursor-pointer rounded-[20px] bg-[#C56E14] px-[5px] py-[8px] font-semibold text-white"
              onClick={() => setStep(3)}
            >
              다음
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="text-[25px]">내 프로필을 설정해보세요!</h1>
            <div className="flex flex-col items-center gap-y-[40px]">
              <div className="relative h-[180px] w-[180px] bg-[#f3f3f3] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {image && <Image src={image} alt="선택한 이미지" fill className="object-cover" />}
              </div>
              <input
                accept="image/*"
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handeFileChange}
              />
              <button
                className="w-[80px] cursor-pointer rounded-[20px] bg-[#C56E14] px-[5px] py-[8px] font-semibold text-white"
                onClick={handleFileButtonClick}
              >
                등록
              </button>
            </div>
            <div className="flex w-full flex-col gap-y-[5px]">
              <div className="flex items-center gap-x-[5px]">
                <label className="text-[16px] font-medium">이름</label>
                <span className="text-[20px] text-red-500">*</span>
              </div>
              <input
                type="text"
                placeholder="이름이나 닉네임을 입력해주세요."
                className="w-full rounded-[5px] border border-[#7d7d7d] p-[10px] focus:border-[#c56e14] focus:outline-none"
              />
            </div>
            <button
              className="w-[120px] cursor-pointer rounded-[20px] bg-[#C56E14] px-[5px] py-[8px] font-semibold text-white"
              onClick={() => setStep(4)}
            >
              완료
            </button>
          </>
        )}
      </div>
      {step === 4 && (
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-y-[30px] px-[48px] pt-[150px]">
          <h1 className="text-[25px]">OO님, 환영해요</h1>
          <h2 className="text-[25px]">
            {selectedRole === '사장님'
              ? '지금 내 카페를 홍보하러 가볼까요?'
              : '지금 맛있는 카페를 찾으러 가볼까요?'}
          </h2>
          <Link href="/" className="text-[18px] font-semibold text-[#714016] hover:underline">
            {selectedRole === '사장님' ? '카페 홍보글 작성하기' : '카페 찾아보기'}
          </Link>
        </div>
      )}
    </>
  );
};

export default SignupPage;
