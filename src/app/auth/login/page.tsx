import Image from 'next/image';
import kakao from '@images/kakao.svg';
import google from '@images/google.svg';
import naver from '@images/naver.svg';
import Link from 'next/link';

const inputfields = [
  {
    label: '이메일',
    type: 'email',
    placeholder: '이메일 형식으로 입력해주세요.',
  },
  {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.',
  },
];

const socialIcons = [
  { src: kakao, alt: '카카오' },
  { src: naver, alt: '네이버' },
  { src: google, alt: '구글' },
];

const LoginPage = () => {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-[48px] pt-[140px]">
      <div className="mb-[40px] flex flex-col items-center gap-y-[7px]">
        <Image src={'/next.svg'} alt="로고 예시" width={200} height={200} />
        <h1>오늘도 만나서 반가워요!</h1>
      </div>
      <form className="mb-[35px] flex w-full flex-col items-center">
        <div className="flex w-full flex-col gap-y-[15px]">
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
        </div>
        <div className="flex w-full justify-end">
          <button type="button" className="cursor-pointer pt-[8px] text-[14px] text-gray-700">
            아이디/비밀번호 찾기 &gt;
          </button>
        </div>
        <button className="mt-[28px] w-[120px] cursor-pointer rounded-[20px] bg-[#C56E14] px-[5px] py-[8px] font-semibold text-white">
          로그인
        </button>
      </form>
      <div className="flex justify-center gap-x-[20px]">
        {socialIcons.map((icon, index) => (
          <button key={index} className="cursor-pointer">
            <Image src={icon.src} alt={icon.alt} width={40} height={40} />
          </button>
        ))}
      </div>
      <div className="mt-[25px] flex gap-x-[10px]">
        <span className="text-gray-500">아직 회원이 아니신가요?</span>
        <Link href="/auth/signup" className="underline">
          회원가입 하러 가기
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
