import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../../../api/public/post.api";

function PostRelated() {

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
  }, [pagination]);

  if (isLoading) return (<div>Đang tải dữ liệu</div>)
  if (isError) return (<div>Hệ thôgns đang lỗi</div>)

  const handleClick_morePost = () => {
    setPagination(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1
    }));
  };
  return (
    <>
      <h1>Công trình liên quan</h1>
      <div className="grid grid-cols-4 gap-4">
        {
          posts.length > 0 && posts?.map((post, index) => {
            const name = post.name.slice(0, 30) + "...";
            return (
            <Link to={`/bai-viet/${post.id}`}>
              <div key={index} className="border border-gray-400 rounded-3xl my-2 py-2">
                <div className="font-bold m-2">{name}</div>
                <div className="w-full aspect-video">
                  <img src={post.images[0]} alt="anh" className="w-full h-full object-cover object-center" />
                </div>
                <div className="text-red-400 m-2">{post.price}</div>
              </div>
            </Link>
          )
          }
        )
        }
      </div>
      {totalPages != 1 && (
        <div onClick={handleClick_morePost} className="mt-4 cursor-pointer text-center">
          <button className="border border-gray-400 px-4 py-2 rounded-3xl">Xem thêm</button>
        </div>
      )}
    </>
  )
}

export default PostRelated;