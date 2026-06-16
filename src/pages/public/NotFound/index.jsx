import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-white px-6 py-20 text-center">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#ff6600] mb-5">Không tìm thấy trang</p>
        <h1 className="text-5xl sm:text-6xl font-black text-zinc-950 mb-6 leading-tight">404</h1>
        <p className="text-lg sm:text-xl text-zinc-600 mb-10">
          Trang bạn đang tìm không tồn tại.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-[4px] bg-[#ff6600] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff7f26]"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
