import { useState, useRef, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isPasswordMismatch = confirmPassword && newPassword !== confirmPassword;

  useEffect(() => {
    setFailCount(0);
  }, []);

  if (!isVerified) {
    if (showResetModal) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/reset-password");
            }}
            className="bg-white p-6 rounded-xl w-[320px] text-center shadow-md animate-fade-in"
          >
            <h2 className="text-lg font-bold mb-4 text-black">비밀번호 재설정</h2>
            <p className="text-sm text-gray-600 mb-4">비밀번호를 5회 이상 틀리셨습니다. 재설정이 필요합니다.</p>
            <button
              type="submit"
              className="bg-[#a66a2d] text-white px-4 py-2 rounded-full text-sm"
            >
              비밀번호 재설정
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setPasswordInput(""); // always clear input
            try { 
              //password api 연동
              const res = await fetch("/api/verify-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: passwordInput }),
              });

              const result = await res.json();

              if (res.ok && result.success) {
                setIsVerified(true);
                setFailCount(0);
              } else {
                const nextFail = failCount + 1;
                setFailCount(nextFail);
                setPasswordError("비밀번호가 일치하지 않습니다.");
                if (nextFail >= 5) {
                  setShowResetModal(true);
                }
              }
            } catch {
              setPasswordError("서버와 연결 중 오류가 발생했습니다.");
            }
          }}
          className="bg-white p-6 rounded-xl w-full max-w-xs text-center animate-fade-in shadow-md"
        >
          <h2 className="text-lg font-bold mb-4 text-black">비밀번호 확인</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="w-full px-3 py-2 border rounded text-sm text-black mb-4"
          />
          {passwordError && (
            <div className="mt-2 mb-4">
              <p className="text-sm text-red-500">{passwordError}</p>
              <p className="text-xs text-red-400 mt-1">틀린 횟수: {failCount} / 5회</p>
              {failCount >= 4 && (
                <p className="text-xs text-red-500 mt-1">※ 5회 이상 틀리면 비밀번호 재설정이 필요합니다.</p>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#a66a2d] text-white px-4 py-2 rounded-full text-sm"
            >
              확인
            </button>
          </div>
          <p
            className="mt-5 text-sm text-[#a66a2d] cursor-pointer hover:underline"
            onClick={() => router.push("/reset-password")}
          >
            비밀번호가 기억나지 않으세요?
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white h-screen flex-1 px-10 py-6">
      <h1 className="text-2xl font-bold text-black mb-6">계정 관리</h1>
      <form
        className="space-y-8 max-w-2xl pb-6"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!nickname.trim()) {
            setNewPassword("");
            setConfirmPassword("");
            alert("닉네임을 입력해주세요.");
            return;
          }

          const phoneRegex = /^010-?\d{4}-?\d{4}$/;
          if (!phoneRegex.test(phone)) {
            setNewPassword("");
            setConfirmPassword("");
            alert("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678");
            return;
          }

          if (!currentPassword || !newPassword || !confirmPassword) {
            setNewPassword("");
            setConfirmPassword("");
            alert("비밀번호를 모두 입력해주세요.");
            return;
          }

          if (newPassword !== confirmPassword) {
            setNewPassword("");
            setConfirmPassword("");
            alert("새 비밀번호와 확인이 일치하지 않습니다.");
            return;
          }

          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
          if (!passwordRegex.test(newPassword)) {
            setNewPassword("");
            setConfirmPassword("");
            alert("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.");
            return;
          }

          try {
            const response = await fetch("/api/profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                nickname,
                phone,
                profileImage,
                currentPassword,
                newPassword,
              }),
            });

            if (response.ok) {
              alert("정보가 성공적으로 저장되었습니다.");
              setNewPassword("");
              setConfirmPassword("");
              router.back();
            } else {
              setNewPassword("");
              setConfirmPassword("");
              alert("서버 오류가 발생했습니다.");
            }
          } catch (error) {
            setNewPassword("");
            setConfirmPassword("");
            alert("전송 중 오류가 발생했습니다.");
            console.error(error);
          }
        }}
      >
        {/* 프로필 이미지 변경 */}
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-400 overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="프로필 이미지" className="w-full h-full object-cover" />
            ) : (
              "+"
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#a66a2d] text-white text-sm px-6 py-2 rounded-full"
          >
            변경
          </button>
        </div>

        {/* 이메일 (비활성화) */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">이메일</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded text-sm bg-gray-100 text-gray-500"
            value="test1234@naver.com"
            disabled
          />
          <p className="text-xs text-red-500 mt-1">* 이메일은 변경 불가능한 항목입니다.</p>
        </div>

        {/* 닉네임 */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm text-black"
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">전화번호</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => {
              const digitsOnly = phone.replace(/\D/g, "");
              if (digitsOnly.length === 11) {
                const formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7)}`;
                setPhone(formatted);
              }
            }}
            className="w-full px-3 py-2 border rounded text-sm text-black"
            placeholder="010-1234-5678"
          />
        </div>

        {/* 비밀번호 변경 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-black">비밀번호 변경</h2>
          <div className="space-y-4">
            {/* 현재 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">현재 비밀번호</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-black pr-10"
                  placeholder="현재 비밀번호를 입력해주세요."
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showCurrent ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 새 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">새 비밀번호</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-black pr-10"
                  placeholder="새 비밀번호를 입력해주세요."
                />
                <button
                  type="button"
                  onClick={() => setShowNew((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNew ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">비밀번호 확인</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-black pr-10"
                  placeholder="비밀번호를 다시 입력해주세요."
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {isPasswordMismatch && (
                <p className="text-sm text-red-500 mt-1">비밀번호가 다릅니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* 변경사항 저장 버튼 */}
        <div className="flex justify-end mb-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#a66a2d] text-white rounded-full hover:bg-[#915a23]"
          >
            변경사항 저장
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-[320px] text-center">
            <h2 className="text-lg font-bold text-black mb-6">프로필 사진 바꾸기</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
              className="flex flex-col gap-3"
            >
              <button
                type="submit"
                className="w-full py-2 rounded-full text-white bg-[#a66a2d] hover:bg-[#915a23] text-sm"
              >
                사진 업로드
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                      const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });

                      if (response.ok) {
                        const result = await response.json();
                        setProfileImage(result.imageUrl); // assume imageUrl is returned
                        setIsModalOpen(false);
                      } else {
                        alert("업로드에 실패했습니다.");
                      }
                    } catch (err) {
                      console.error("업로드 오류:", err);
                      alert("업로드 중 오류가 발생했습니다.");
                    }
                  }
                }}
              />
              <button
                type="button"
                className="w-full py-2 rounded-full text-red-500 border border-red-300 text-sm"
                onClick={() => {
                  setProfileImage(null);
                  setIsModalOpen(false);
                }}
              >
                현재 사진 삭제
              </button>
              <button
                type="button"
                className="w-full py-2 rounded-full text-sm text-gray-700 border"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}