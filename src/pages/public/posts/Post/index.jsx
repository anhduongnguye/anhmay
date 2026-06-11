import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../../../api/public/post.api";
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { PiShareFatThin } from "react-icons/pi";
import FacebookImageGrid from '../../FacebookImageGrid';
import { useSelector } from "react-redux";

function Post() {
  const company = useSelector((state) => state.company.company)
  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20
  });
  var totalPages = 1;
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getPosts(pagination);
        if (response.status === 200) {
          setPosts(prev => ([...posts, ...response.data.data]));
          totalPages = response.data.totalPages;
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách category:", error);
        setError(true)
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  if (isLoading) return (<div>Đang tải dữ liệu</div>)
  if (isError) return (<div>Hệ thôgns đang lỗi</div>)

  const handleClick_morePost = () => {
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1
    }));
  };
  return (
    <div className="mt-4">
      <h1 className="mb-4">Công trình đã bàn giao</h1>
      <div className="flex flex-col gap-y-4">
        {
          posts.length > 0 && posts?.map((post, index) => (
            <div className="flex gap-x-2 items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="data:image/png;base64,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" alt=""
                  className="w-full h-full object-cover object-center" />
              </div>
              <div key={index} className="border border-gray-400 p-4 rounded-3xl flex-1">
                <Link to={`/bai-viet/${post.id}`}>
                  <div className="font-bold mb-2">{company.name}</div>
                  <div className="font-bold mb-2">{post.name}</div>
                  <div className="mb-2">{post.name}... <span className="font-thin text-black">Xem chi tiết</span></div>
                </Link>
                <div>
                  <FacebookImageGrid post={post} />
                </div>
                <div className="font-bold text-red-600 my-1">{post.price}</div>
                <ul className="flex justify-start gap-x-4">
                  <li className="flex items-center justify-center gap-x-2">
                    <IoIosHeartEmpty size={26} />
                    <span>{post.likeCount}</span>
                  </li>
                  <li className="flex items-center justify-center gap-x-2">
                    <TfiComment size={22} />
                    <span>{post.likeCount}</span>
                  </li>
                  <li>
                    <PiShareFatThin size={30} />
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
      </div>
      {totalPages != 1 && (
        <div onClick={handleClick_morePost} className="mt-4 cursor-pointer text-center">
          <button className="border border-gray-400 px-4 py-2 rounded-3xl">Xem thêm</button>
        </div>
      )}
    </div>
  )
}

export default Post;