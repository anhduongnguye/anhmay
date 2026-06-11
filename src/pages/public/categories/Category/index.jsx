import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../../api/public/category";
import { FaChevronRight } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
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
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  if (isLoading) return <div className="text-center py-20 text-gray-500 font-medium">Đang tải dữ liệu!</div>;
  if (isError) return <div className="text-center py-20 text-red-500 font-medium">Hệ thống đang gặp sự cố!</div>;

  return (
    <>
      <div className="mt-12 mb-16 px-4 max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-gray-400 uppercase tracking-widest text-[13px] font-bold mb-3">
            Cung cấp dịch vụ
          </span>
          <h2 className="text-2xl md:text-[36px] text-black font-extrabold max-w-3xl leading-tight">
            Chúng tôi cung cấp tất cả dịch vụ về cơ khí rẻ nhất thị trường
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.length > 0 &&
            categories.map((category, index) => (
              <div 
                key={index} 
                className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-sm flex flex-col h-full"
              >
                <Link to={`/danh-muc/${category.id}`} className="flex flex-col h-full">
                  {/* Container Ảnh đúng tỷ lệ đứng như hình mẫu */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <img
                      src="https://reactheme.com/products/html/elevate/assets/images/project/38.jpg"
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Phần khối nội dung màu đen bên dưới */}
                  <div className="bg-[#111111] p-6 pr-[75px] pb-8 relative flex-grow flex items-center min-h-[110px]">
                    {/* Tên danh mục hiển thị chuẩn font trắng, đậm */}
                    <h3 className="text-white text-xl md:text-[22px] font-bold tracking-wide leading-snug">
                      {category.name}
                    </h3>

                    {/* Nút mũi tên vuông màu cam chuẩn khít góc tuyệt đối như ảnh mẫu */}
                    <div className="absolute bottom-0 right-0 bg-[#FF5B00] w-14 h-14 flex items-center justify-center text-white">
                      <FaChevronRight className="text-[18px]" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Category;