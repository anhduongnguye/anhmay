import { useEffect, useState } from "react";
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
      }
    };
    fetchApi();
  }, [pagination.currentPage]);

  if (isLoading && posts.length === 0) return (
    <div className="flex items-center justify-center py-24 text-zinc-950 text-[12px] font-black uppercase tracking-[0.2em]">
      ĐANG TẢI DỮ LIỆU KHÔNG GIAN...
    </div>
  );
  
  if (isError) return (
    <div className="flex items-center justify-center py-24 text-red-600 text-[12px] font-black uppercase tracking-[0.2em]">
      HỆ THỐNG GẶP SỰ CỐ KẾT NỐI!
    </div>
  );

  const handleClick_morePost = () => {
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1
    }));
  };

  return (
    <div className="mt-16 font-['Titillium_Web',sans-serif] px-6 max-w-7xl mx-auto mb-20">
      
      {/* SECTION HEADING - Đứng im cố định, chữ đen tuyền, nét căng nguyên bản */}
      <div className="flex flex-col items-start justify-between md:flex-row md:items-end border-b border-zinc-200 pb-8 mb-12">
        <div>
          <span className="text-[#ff5a00] uppercase tracking-[0.3em] text-[11px] font-black block mb-3">
            Portfolio / Kiến tạo giá trị
          </span>
          <h2 className="text-3xl md:text-[42px] text-zinc-900 font-black leading-none uppercase tracking-tight">
            Dự án đã bàn giao
          </h2>
        </div>
        <div className="mt-4 md:mt-0 text-zinc-500 text-sm font-medium max-w-xs">
          Minh chứng năng lực qua những công trình thực tế đã hoàn thiện xuất sắc.
        </div>
      </div>

      {/* POST GRID - Render trực tiếp, ổn định tuyệt đối */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        {posts.length > 0 && posts.map((post, index) => {
          const dateStr = formatDate(post.createdAt || post.date);
          return (
            <div
              key={post.id || index}
              className="group/card flex flex-col bg-transparent overflow-hidden h-full"
            >
              <div className="w-full relative rounded-[4px] overflow-hidden transition-all duration-500 ease-out group-hover/card:shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
                <FacebookImageGrid post={post} />
              </div>

              <Link
                to={`/bai-viet/${post.id}`}
                aria-label={`Xem chi tiết ${post.name}`}
                className="group/link flex flex-col flex-grow pt-5 pb-2 no-underline text-inherit cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  {dateStr && (
                    <div className="flex items-center gap-2 text-zinc-500 text-[12px] font-bold uppercase tracking-wider">
                      <FaRegClock className="text-[#ff5a00] text-[11px] shrink-0" aria-hidden="true" />
                      <span>{dateStr}</span>
                    </div>
                  )}

                  {post.price && (
                    <div className="text-[#ff5a00] text-[13px] font-black tracking-wide bg-[#ff5a00]/5 px-2.5 py-0.5 rounded-sm">
                      {post.price}
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
        })}
      </div>

      {/* LOAD MORE BUTTON */}
      {pagination.currentPage < totalPages && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={handleClick_morePost}
            className="group/more relative z-10 overflow-hidden inline-flex items-center w-fit h-[52px] pl-[30px] pr-[5px] py-[5px] bg-transparent text-[#0C0A0A] hover:text-white border border-[#ff6600] rounded-[2px] text-[14px] font-bold uppercase tracking-[0.08em] no-underline transition-colors duration-300 after:content-[''] after:absolute after:inset-0 after:bg-[#ff6600] after:-z-10 after:translate-y-[110%] hover:after:translate-y-0 after:transition-transform after:duration-300"
          >
            <span>XEM THÊM DỰ ÁN</span>
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