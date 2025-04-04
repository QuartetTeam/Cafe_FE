import React from "react";
import { useRouter } from "next/navigation";

interface WithdrawalModalProps {
  closeModal: () => void;
  onConfirm: () => void;
}

export default function WithdrawalModal({ closeModal, onConfirm }: WithdrawalModalProps) {
  const router = useRouter();

  const handleConfirm = async () => {
    await onConfirm();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-black">정말 탈퇴하시겠습니까?</h2>
        <p className="mb-6 text-sm text-gray-600">탈퇴 시 모든 데이터가 삭제됩니다.</p>
        <div className="flex justify-end gap-3">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-black rounded">
            취소
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}