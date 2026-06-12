import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../../api/public/category";
import { FaChevronRight } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  
  // Khởi tạo các bộ điều khiển hiệu ứng cuộn trang
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Kích hoạt IntersectionObserver đồng bộ y hệt như Footer của bạn
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // Kích hoạt sớm khi vừa chạm 5% diện tích khối
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isLoading]); // Chạy lại khi dữ liệu đã tải xong để tính toán tọa độ chính xác

  if (isLoading) return (
    <div className="text-center py-24 text-zinc-500 text-[12px] font-extrabold uppercase tracking-[0.2em]">
      ĐANG TẢI DANH MỤC DỊCH VỤ...
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-24 text-red-500 text-[12px] font-extrabold uppercase tracking-[0.2em]">
      HỆ THỐNG GẶP SỰ CỐ TẢI DỮ LIỆU!
    </div>
  );

  return (
    <div 
      ref={sectionRef}
      id="category-section"
      className="w-full bg-transparent py-16 font-sans overflow-hidden"
    >
      <div className="px-6 max-w-[1320px] mx-auto">
        
        {/* HEADING SECTION - Hiệu ứng trượt lên mượt mà */}
        <div className={`flex flex-col items-center text-center mb-14 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          <span className="text-[#ff5a00] uppercase tracking-[0.3em] text-[11px] font-extrabold mb-3 block">
            CUNG CẤP DỊCH VỤ
          </span>
          <h2 className="text-2xl md:text-[36px] text-zinc-950 font-black max-w-3xl leading-tight uppercase tracking-tight">
            Chúng tôi cung cấp tất cả dịch vụ về cơ khí rẻ nhất thị trường
          </h2>
          {/* Họa tiết 3 đường kẻ độc quyền */}
          <div className="flex items-center gap-1.5 mt-4">
            <div className="w-12 h-[2px] bg-[#ff5a00]"></div>
            <div className="w-2.5 h-[2px] bg-[#ff5a00]"></div>
            <div className="w-2.5 h-[2px] bg-[#ff5a00]"></div>
          </div>
        </div>

        {/* LƯỚI DỊCH VỤ 3 CỘT - Hiệu ứng thác đổ (Staggered Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.length > 0 &&
            categories.map((category, index) => {
              const serviceNum = (index + 1).toString().padStart(2, "0");
              
              // Tạo độ trễ (delay) khác nhau cho từng cột (Cột 1 hiện trước, cột 2, cột 3 đuổi theo)
              const delays = ["delay-200", "delay-400", "delay-600"];
              const currentDelay = delays[index % 3];

              return (
                <div 
                  key={index} 
                  className={`group overflow-hidden bg-[#111111] border border-[#ffffff05] hover:border-[#ff5a00]/30 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col h-full transition-all duration-1000 transform ${
                    isVisible ? `translate-y-0 opacity-100 ${currentDelay}` : "translate-y-16 opacity-0"
                  }`}
                >
                  <Link to={`/danh-muc/${category.id}`} className="flex flex-col h-full">
                    
                    {/* KHUNG ẢNH: Tỷ lệ vàng 4:3, Hiệu ứng thu phóng Ken Burns chậm cực sang */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616]">
                      <img
                        src={category.image || "https://reactheme.com/products/html/elevate/assets/images/project/38.jpg"}
                        alt={category.name}
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                      
                      {/* Số thứ tự đè góc ảnh */}
                      <div className="absolute top-0 left-0 bg-[#ff5a00] text-white text-[12px] font-black tracking-widest px-3 py-1.5">
                        {serviceNum}
                      </div>
                    </div>

                    {/* KHỐI CHỮ NỀN TỐI SÂU THẲM */}
                    <div className="bg-[#111111] px-6 py-6 relative flex-grow flex items-center justify-between gap-4 border-t border-[#ffffff05] min-h-[100px]">
                      <div className="flex flex-col text-left">
                        <span className="text-zinc-500 font-bold text-[10px] mb-1.5 tracking-[0.2em] uppercase">
                          HẠNG MỤC GIA CÔNG
                        </span>
                        <h3 className="text-white text-[17px] md:text-[19px] font-black uppercase tracking-wide leading-snug transition-colors duration-300 group-hover:text-[#ff5a00]">
                          {category.name}
                        </h3>
                      </div>

                      {/* Nút mũi tên vuông vức góc cạnh */}
                      <div className="w-[42px] h-[42px] bg-[#ffffff0a] border border-white/5 group-hover:border-transparent group-hover:bg-white text-white group-hover:text-[#ff5a00] flex items-center justify-center shrink-0 transition-all duration-300">
                        <FaChevronRight className="text-[12px] transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Category;