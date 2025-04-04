interface PasswordChangeFormProps {
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  }
  
  // PasswordChangeForm.tsx
export default function PasswordChangeForm({
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  }: PasswordChangeFormProps) {
    return (
      <form className="flex flex-col space-y-4">
        <input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          placeholder="새 비밀번호"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="비밀번호 확인"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          변경
        </button>
      </form>
    );
  }