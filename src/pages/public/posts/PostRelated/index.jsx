import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../../../api/public/post.api";

function PostRelated() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 4 // Chia 4 cột chuẩn responsive cho PC
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
        console.error("Lỗi khi lấy danh sách bài viết liên quan:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [pagination.currentPage]);

  if (isLoading) return (
    <div className="flex items-center justify-center py-16 text-zinc-500 text-[12px] font-extrabold uppercase tracking-[0.2em]">
      ĐANG TẢI CÔNG TRÌNH LIÊN QUAN...
    </div>
  );
  
  if (isError) return (
    <div className="flex items-center justify-center py-16 text-red-500 text-[12px] font-extrabold uppercase tracking-[0.2em]">
      HỆ THỐNG LỖI TẢI DỮ LIỆU
    </div>
  );

  const handleClick_morePost = () => {
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1
    }));
  };

  return (
    <div className="w-full bg-[#0d0d0d] py-16 text-zinc-300 font-sans border-t border-[#ffffff0d]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        
        {/* TIÊU ĐỀ KHỐI - CHUẨN CƠ KHÍ NGUYỄN MAY */}
        <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#ffffff0d] pb-6">
          <div>
            <span className="text-[#ff5a00] text-[11px] font-extrabold uppercase tracking-[0.3em] mb-2 block">
              HỆ SINH THÁI CHẾ TẠO
            </span>
            <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">
              Công trình liên quan
            </h2>
          </div>
          
          {/* Họa tiết 3 đường kẻ độc quyền lấy từ Footer của bạn */}
          <div className="flex items-center gap-[5px] mb-1">
            <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
            <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
          </div>
        </div>

        {/* LƯỚI CARD - RESPONSIVE 1 CỘT (MOBILE) -> 2 CỘT (TABLET) -> 4 CỘT (PC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.length > 0 && posts.map((post, index) => {
            // Cắt chữ 35 ký tự tinh tế cho vừa vặn layout lưới hẹp
            const name = post.name.length > 35 ? post.name.slice(0, 35) + "..." : post.name;
            
            return (
              <Link
                key={post.id || index}
                to={`/bai-viet/${post.id}`}
                aria-label={`Xem chi tiết ${post.name}`}
                className="group/card group/link flex flex-col bg-[#111111] border border-[#ffffff05] hover:border-[#ff5a00]/30 transition-all duration-500 overflow-hidden relative no-underline text-inherit cursor-pointer"
              >
                <div className="w-full aspect-video relative overflow-hidden bg-[#161616]">
                  <img
                    src={post.images && post.images[0] ? post.images[0] : "https://via.placeholder.com/400x225"}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover object-center scale-100 group-hover/card:scale-105 transition-transform duration-[4000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/0 transition-colors duration-500" aria-hidden="true" />

                  {post.price && (
                    <div className="absolute bottom-0 left-0 text-white text-[11px] font-black tracking-widest bg-[#ff5a00] px-3 py-1 uppercase">
                      {post.price}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-white font-extrabold text-[15px] uppercase tracking-wide leading-snug mb-6 line-clamp-2 min-h-[44px] group-hover/card:text-[#ff5a00] group-hover/link:text-[#ff5a00] transition-colors duration-300">
                    {name}
                  </h3>

                  <div className="mt-auto">
                    <span className="group/btn relative z-10 overflow-hidden flex items-center justify-between pl-5 pr-1 py-1 w-full h-[44px] bg-transparent text-white border border-white/10 group-hover/card:border-[#ff5a00] group-hover/link:border-[#ff5a00] text-[11px] font-extrabold uppercase tracking-widest transition-colors duration-300 after:content-[''] after:absolute after:inset-0 after:bg-[#ff5a00] after:-z-10 after:translate-y-[102%] group-hover/link:after:translate-y-0 after:transition-transform after:duration-300">
                      <span>XEM CHI TIẾT</span>
                      <span className="flex items-center justify-center shrink-0 w-[34px] h-[34px] bg-[#ff5a00] group-hover/link:bg-white text-white group-hover/link:text-[#ff5a00] transition-colors duration-300" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* NÚT XEM THÊM - Đặt ở giữa, lực và bề thế */}
        {pagination.currentPage < totalPages && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={handleClick_morePost}
              className="group/more relative z-10 overflow-hidden flex items-center justify-between pl-6 pr-1 w-full sm:w-[260px] h-[50px] bg-[#ff5a00] text-white font-extrabold text-[11px] uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <span>XEM THÊM CÔNG TRÌNH</span>
              
              <span className="flex items-center justify-center shrink-0 w-[40px] h-[40px] bg-white/10 group-hover/more:bg-black group-hover/more:text-white text-white transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default PostRelated;