import { useParams } from "react-router-dom";
import { getPostById } from "../../../../api/public/post.api";
import { useEffect, useState } from "react";
import PostRelated from "../PostRelated";
import { useSelector } from "react-redux";
import Contact from "../../../../layouts/public/PublicLayout/contact";
import FacebookImageGrid from "../../FacebookImageGrid";
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { PiShareFatThin } from "react-icons/pi";

function PostDetail() {
  const company = useSelector((state) => state.company.company)
  const { id: postId } = useParams();
  const [post, setPost] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getPostById(postId);
        if (response.status === 200) {
          setPost(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
        setError(true)
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [postId]);
  if (isLoading) return (<div>Đang tải dữ liệu</div>)
  if (isError) return (<div>Hệ thôgns đang lỗi</div>)
  return (
    <>
      <Contact company={company} />
      <div className="border border-gray-400 p-4 rounded-3xl">
          <div className="font-bold mb-2">{company.name}</div>
          <div className="font-bold mb-2">{post.name}</div>
          <div className="mb-2">{post.name}</div>
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
      <PostRelated />
    </>
  )
}

export default PostDetail;