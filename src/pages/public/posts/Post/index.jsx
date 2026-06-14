import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../../../api/public/post.api";
import FacebookImageGrid from '../../FacebookImageGrid';
import { useSelector } from "react-redux";
import { FaRegClock } from "react-icons/fa";

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date)) return null;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day} tháng ${month.toString().padStart(2, "0")}`;
}

// Component con xử lý hiệu ứng an toàn cho từng Card Dự án
function PostCard({ post, index, dateStr }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Khi đã hiện thì giữ nguyên, không ẩn lại nữa để tránh mất chữ
        }
      },
      { threshold: 0.02 } // Kích hoạt rất sớm khi vừa chạm nhẹ màn hình
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const delays = ["delay-[0ms]", "delay-[150ms]", "delay-[300ms]"];
  const currentDelay = delays[index % 3];

  return (
    <div
      ref={cardRef}
      className={`group/card flex flex-col bg-transparent overflow-hidden h-full transition-all duration-[800ms] ease-out transform ${isVisible
          ? `translate-y-0 opacity-100 ${currentDelay}`
          : "translate-y-4 opacity-30" // Trạng thái chờ: Chỉ mờ nhẹ và hơi nhích xuống một chút, không bao giờ lo mất chữ
        }`}
    >
      {/* Khung ảnh Facebook Grid */}
      <div className="w-full relative rounded-[4px] overflow-hidden transition-all duration-500 ease-out group-hover/card:shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
        <FacebookImageGrid post={post} />
      </div>

      <Link
        to={`/bai-viet/${post.id}`}
        aria-label={`Xem chi tiết ${post.name}`}
        className="group/link flex flex-col flex-grow pt-5 pb-2 no-underline text-inherit cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          {post.price && (
            <div className="text-[#ff5a00] text-[13px] font-black tracking-wide bg-[#ff5a00]/5 px-2.5 py-0.5 rounded-sm">
              {post.price}
            </div>
          )}
          {dateStr && (
            <div className="flex items-center gap-2 text-zinc-400 text-[12px] font-semibold uppercase tracking-wider">
              <FaRegClock className="text-[#ff5a00] text-[11px] shrink-0" aria-hidden="true" />
              <span>{dateStr}</span>
            </div>
          )}

          
        </div>

        <h3 className="text-zinc-900 font-black text-[20px] md:text-[22px] leading-tight mb-5 line-clamp-2 group-hover/card:text-[#ff5a00] group-hover/link:text-[#ff5a00] transition-colors duration-300">
          {post.name}
        </h3>

        <div className="mt-auto">
          <span className="group/btn relative z-10 overflow-hidden inline-flex items-center w-fit h-[52px] pl-[25px] pr-[5px] py-[5px] bg-transparent text-[#0C0A0A] group-hover/link:text-white border border-[#ff6600] rounded-[2px] text-[14px] font-bold uppercase tracking-[0.08em] transition-colors duration-300 after:content-[''] after:absolute after:inset-0 after:bg-[#ff6600] after:-z-10 after:translate-y-[110%] group-hover/link:after:translate-y-0 after:transition-transform after:duration-300">
            <span>XEM CHI TIẾT</span>
            <span className="flex items-center justify-center shrink-0 w-[40px] h-[40px] ml-[20px] bg-[#ff6600] group-hover/link:bg-white text-white group-hover/link:text-[#ff6600] transition-colors duration-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

function Post() {
  const company = useSelector((state) => state.company.company);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20
  });

  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getPosts(pagination);
        if (response.status === 200) {
          setPosts(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newPosts = response.data.data.filter(p => !existingIds.has(p.id));
            return [...prev, ...newPosts];
          });
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        setError(true);
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };
    fetchApi();
  }, [pagination.currentPage]);

  if (isLoading && posts.length === 0) return (
    <div className="flex items-center justify-center py-24 text-zinc-500 text-[12px] font-extrabold uppercase tracking-[0.2em]">
      ĐANG TẢI DỮ LIỆU KHÔNG GIAN...
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center py-24 text-red-500 text-[12px] font-extrabold uppercase tracking-[0.2em]">
      HỆ THỐNG GẶP SỰ CỐ KẾT NỐI!
    </div>
  );

  const handleClick_morePost = () => {
    setIsLoadingMore(true);
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1
    }));
  };

  return (
    <div id="post-section" className="mt-16 font-['Titillium_Web',sans-serif] px-6 max-w-7xl mx-auto mb-20 overflow-hidden">
      {/* SECTION HEADING */}
      <div className="flex flex-col items-start justify-between md:flex-row md:items-end border-b border-zinc-100 pb-8 mb-12">
        <div>
          <span className="text-[#ff5a00] uppercase tracking-[0.3em] text-[11px] font-extrabold block mb-3">
            Portfolio / Kiến tạo giá trị
          </span>
          <h2 className="text-3xl md:text-[42px] text-zinc-900 font-black leading-none uppercase tracking-tight">
            Dự án đã bàn giao
          </h2>
        </div>
        <div className="mt-4 md:mt-0 text-zinc-400 text-sm font-light max-w-xs">
          Minh chứng năng lực qua những công trình thực tế đã hoàn thiện xuất sắc.
        </div>
      </div>

      {/* POST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        {posts.length > 0 && posts.map((post, index) => {
          const dateStr = formatDate(post.createdAt || post.date);
          return (
            <PostCard
              key={post.id || index}
              post={post}
              index={index}
              dateStr={dateStr}
            />
          );
        })}
      </div>

      {/* LOAD MORE BUTTON */}
      {pagination.currentPage < totalPages && (
        <div className="mt-20 flex justify-center">
          <button
            type="button"
            onClick={handleClick_morePost}
            disabled={isLoadingMore}
            aria-busy={isLoadingMore}
            className="group/more relative z-10 overflow-hidden inline-flex items-center w-fit h-[52px] pl-[30px] pr-[5px] py-[5px] bg-transparent text-[#0C0A0A] hover:text-white border border-[#ff6600] rounded-[2px] text-[14px] font-bold uppercase tracking-[0.08em] no-underline transition-colors duration-300 after:content-[''] after:absolute after:inset-0 after:bg-[#ff6600] after:-z-10 after:translate-y-[110%] hover:after:translate-y-0 after:transition-transform after:duration-300 disabled:opacity-60 disabled:cursor-wait"
          >
            <span>{isLoadingMore ? 'ĐANG TẢI...' : 'XEM THÊM DỰ ÁN'}</span>
            <span className="flex items-center justify-center shrink-0 w-[40px] h-[40px] ml-[30px] bg-[#ff6600] group-hover/more:bg-white text-white group-hover/more:text-[#ff6600] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;