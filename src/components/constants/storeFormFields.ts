export type InputField = {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  multiple?: { id: string }[];
};

export const inputfields: InputField[] = [
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
      multiple: [{ id: 'menu-1' }, { id: 'menu-2' }],
    },
  ];