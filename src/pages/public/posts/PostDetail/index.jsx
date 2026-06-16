import { useParams, Link } from "react-router-dom";
import { getPostById } from "../../../../api/public/post.api";
import { useEffect, useState } from "react";
import PostRelated from "../PostRelated";
import { useSelector } from "react-redux";
import FacebookImageGrid from "../../FacebookImageGrid";
import { useScrollToSection } from "../../../../hooks/useScrollToSection";
import { scrollToTop } from "../../../../utils/motion";
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { FaRegClock, FaTags, FaChevronRight } from "react-icons/fa";
import SharePost from "../../../../components/SharePost";
import { usePostMeta } from "../../../../hooks/usePostMeta";

function PostDetail() {
  const company = useSelector((state) => state.company.company);
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const scrollToSection = useScrollToSection();
  usePostMeta(post, company?.name);

  useEffect(() => {
    scrollToTop();
    setLoading(true);
    setPost(null);
    setError(false);

    const fetchApi = async () => {
      try {
        const response = await getPostById(postId);
        if (response.status === 200) {
          setPost(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [postId]);

  /* ── Loading ── */
  if (isLoading) return (
    <div className="w-full min-h-[60vh] bg-[#0d0d0d] flex flex-col items-center justify-center gap-4">
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-[#ff5a00]"
            style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }}
          />
        ))}
      </div>
      <p className="text-zinc-500 text-[11px] font-extrabold uppercase tracking-[0.3em]">
        Đang tải công trình...
      </p>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:.5} 40%{transform:scale(1.2);opacity:1} }`}</style>
    </div>
  );

  /* ── Error ── */
  if (isError) return (
    <div className="w-full min-h-[60vh] bg-[#0d0d0d] flex items-center justify-center">
      <p className="text-red-400 text-[12px] font-extrabold uppercase tracking-[0.3em]">
        Hệ thống gặp sự cố tải bài viết
      </p>
    </div>
  );

  const formattedDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "";

  return (
    <div className="w-full font-sans bg-[#0d0d0d]">
      {/* ══ HERO BREADCRUMB BAND ══ */}
      <div className="w-full bg-[#111111] border-b border-[#ffffff0d] py-5 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-zinc-500">
          <Link to="/" className="hover:text-[#ff5a00] transition-colors duration-200">Trang chủ</Link>
          <FaChevronRight className="text-[9px] text-zinc-700" />
          <a
            href="/#post-section"
            onClick={(e) => scrollToSection('post-section', e)}
            className="hover:text-[#ff5a00] transition-colors duration-200"
          >
            Công trình
          </a>
          <FaChevronRight className="text-[9px] text-zinc-700" />
          <span className="text-zinc-400 line-clamp-1">{post?.name}</span>
        </div>
      </div>

      {/* ══ HERO TITLE SECTION ══ */}
      <div className="w-full bg-[#111111] pt-12 pb-14 px-6 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 60px), repeating-linear-gradient(180deg,#fff 0,#fff 1px,transparent 0,transparent 60px)" }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Label cam */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-[5px]">
              <div className="h-[2px] w-[30px] bg-[#ff5a00]" />
              <div className="h-[2px] w-[8px] bg-[#ff5a00]" />
              <div className="h-[2px] w-[8px] bg-[#ff5a00]" />
            </div>
            <span className="text-[#ff5a00] text-[11px] font-extrabold uppercase tracking-[0.3em]">
              Công trình thực tế
            </span>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-white text-2xl md:text-4xl lg:text-[48px] font-black uppercase tracking-tight leading-[1.1] max-w-4xl mb-8">
            {post?.name}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 w-full">
            {post?.price && (
              <div className="flex items-center gap-2 bg-[#ff5a00] text-white text-[12px] font-black uppercase tracking-widest px-4 py-1.5 shrink-0">
                <FaTags className="text-[11px]" />
                <span>{post.price}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-2 text-zinc-400 text-[13px] font-semibold">
                <FaRegClock className="text-[#ff5a00] text-[12px]" />
                <span>{formattedDate}</span>
              </div>
            )}
            {company?.name && (
              <div className="flex items-center gap-2 text-zinc-500 text-[12px] font-semibold uppercase tracking-wider border-l border-[#ffffff10] pl-8 ml-auto">
                {company.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="w-full bg-[#f7f7f5] px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

            {/* ── CỘT CHÍNH: ẢNH + MÔ TẢ ── */}
            <div className="flex flex-col gap-6">

              {/* Ảnh gallery */}
              <div className="w-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-[2px]">
                <FacebookImageGrid post={post} />
              </div>

              {/* Thanh tương tác */}
              <div className="flex items-center gap-6 bg-white px-6 py-4 border-l-4 border-[#ff5a00] shadow-sm">
                <button type="button" aria-label={`Thích bài viết, ${post?.likeCount ?? 0} lượt thích`} className="flex items-center gap-2 text-zinc-400 hover:text-[#ff5a00] transition-colors duration-200 text-[13px] font-semibold">
                  <IoIosHeartEmpty className="text-[18px]" aria-hidden="true" />
                  <span>{post?.likeCount ?? 0}</span>
                </button>
                <div className="w-px h-5 bg-zinc-200" aria-hidden="true" />
                <button type="button" aria-label={`Bình luận, ${post?.commentCount ?? 0} bình luận`} className="flex items-center gap-2 text-zinc-400 hover:text-[#ff5a00] transition-colors duration-200 text-[13px] font-semibold">
                  <TfiComment className="text-[14px]" aria-hidden="true" />
                  <span>{post?.commentCount ?? 0}</span>
                </button>
                <div className="w-px h-5 bg-zinc-200" aria-hidden="true" />
                <SharePost post={post} companyName={company?.name} />
              </div>

              {/* Mô tả */}
              {post?.description && (
                <div className="bg-white p-8 shadow-sm border-t-2 border-[#ff5a00]">
                  <h2 className="text-zinc-900 font-black text-[15px] uppercase tracking-[0.2em] mb-1 flex items-center gap-3">
                    <span className="w-1 h-5 bg-[#ff5a00] shrink-0 block" />
                    Mô tả công trình
                  </h2>
                  <div className="mt-5 text-zinc-600 text-[15px] leading-[1.9] font-normal whitespace-pre-line">
                    {post.description}
                  </div>
                </div>
              )}
            </div>

            {/* ── CỘT PHỤ: SIDEBAR ── */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-[130px]">

              {/* Thông tin công ty */}
              <div className="bg-[#111111] text-white p-7">
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#ff5a00] mb-4">
                  Đơn vị thực hiện
                </h3>
                <div className="flex items-center gap-[5px] mb-5">
                  <div className="h-[2px] w-[30px] bg-[#ff5a00]" />
                  <div className="h-[2px] w-[8px] bg-[#ff5a00]" />
                </div>
                <p className="text-white font-black text-[18px] uppercase tracking-wide leading-snug mb-2">
                  {company?.name || "Cơ Khí Nguyễn May"}
                </p>
                <p className="text-zinc-400 text-[13px] leading-relaxed">
                  {company?.address || "Chuyên cung cấp giải pháp cơ khí chính xác, uy tín hàng đầu."}
                </p>
                {company?.phone && (
                  <a
                    href={`tel:${company.phone}`}
                    className="mt-5 flex items-center justify-between bg-[#ff5a00] hover:bg-white hover:text-black text-white px-5 py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300 group"
                  >
                    <span>Liên hệ ngay</span>
                    <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>

              {/* Thông tin chi tiết */}
              <div className="bg-white border border-zinc-100 p-7">
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#ff5a00] mb-4">
                  Thông tin dự án
                </h3>
                <div className="flex items-center gap-[5px] mb-5">
                  <div className="h-[2px] w-[30px] bg-[#ff5a00]" />
                  <div className="h-[2px] w-[8px] bg-[#ff5a00]" />
                </div>
                <ul className="space-y-4">
                  {formattedDate && (
                    <li className="flex items-start justify-between gap-4 text-[13px] border-b border-zinc-50 pb-4">
                      <span className="text-zinc-400 font-semibold uppercase tracking-wider shrink-0">Ngày đăng</span>
                      <span className="text-zinc-800 font-black text-right">{formattedDate}</span>
                    </li>
                  )}
                  {post?.price && (
                    <li className="flex flex-col items-start gap-1.5 text-[13px] border-b border-zinc-50 pb-4">
                      <span className="text-zinc-400 font-semibold uppercase tracking-wider">Giá trị</span>
                      <span className="text-[#ff5a00] font-black">{post.price}</span>
                    </li>
                  )}
                  <li className="flex items-start justify-between gap-4 text-[13px]">
                    <span className="text-zinc-400 font-semibold uppercase tracking-wider shrink-0">Trạng thái</span>
                    <span className="text-emerald-600 font-black text-right flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      Đã hoàn thành
                    </span>
                  </li>
                </ul>
              </div>

              {/* Chia sẻ công trình */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-7 text-white border border-white/5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#ff5a00] mb-3">
                  Chia sẻ ngay
                </p>
                <p className="text-white font-black text-[17px] uppercase leading-snug mb-2">
                  Lan tỏa công trình
                </p>
                <SharePost post={post} companyName={company?.name} variant="sidebar" />
              </div>

              {/* CTA báo giá */}
              <div className="bg-gradient-to-br from-[#ff5a00] to-[#cc4400] p-7 text-white">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/70 mb-3">
                  Bạn có nhu cầu tương tự?
                </p>
                <p className="text-white font-black text-[18px] uppercase leading-snug mb-5">
                  Nhận báo giá<br/>miễn phí ngay
                </p>
                <a
                  href="/#lien-he"
                  onClick={(e) => scrollToSection('lien-he', e)}
                  className="flex items-center justify-between bg-white text-[#ff5a00] hover:bg-[#111111] hover:text-white px-5 py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300 group"
                >
                  <span>Yêu cầu báo giá</span>
                  <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ CÔNG TRÌNH LIÊN QUAN ══ */}
      <PostRelated postId={postId} />
    </div>
  );
}

export default PostDetail;