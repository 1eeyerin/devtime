import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm space-y-6">
        <div className="space-y-2 text-center">
          <span className="text-sm font-medium text-gray-500">DevTime</span>
          <h1 className="text-2xl font-semibold text-gray-900">로그인</h1>
        </div>
        <form className="space-y-4">
          <label className="space-y-2 block">
            <span className="text-sm font-medium text-gray-700">아이디</span>
            <input
              type="email"
              placeholder="이메일 주소를 입력해 주세요."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-medium text-gray-700">비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-800 py-2 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            로그인
          </button>
        </form>
        <Link
          className="font-semibold text-blue-600 hover:underline"
          href="/signup"
        >
          회원가입
        </Link>
      </div>
    </section>
  );
}
