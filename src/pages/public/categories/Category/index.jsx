import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../../api/public/category";

function Category() {

  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getCategories();
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  if (isLoading) return (<div>Đang tải dữ liệu!</div>)
  if (isError) return (<div>Hệ thống đang gặp sự cố!</div>)


  return (
    <>
      <div className="mt-4">
        <h1 className="mb-4">Cung cấp dịch vụ</h1>
        <div className="flex gap-x-2">
          {
            categories.length > 0 && categories?.map((category, index) => (
              <div key={index} className="px-3 py-2 border border-gray-400 rounded-3xl bg-orange-500">
                <Link to={`/danh-muc/${category.id}`}>
                  <h1 className="font-bold text-white">{category.name}</h1>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default Category;