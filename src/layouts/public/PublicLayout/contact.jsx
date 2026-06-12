import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

export default function Contact() {
  const company = useSelector((state) => state.company.company);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    details: '',
    acceptTerms: false
  });

  // Thiết lập bộ dò tìm tọa độ cuộn màn hình
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Kích hoạt hiệu ứng khi khối này lộ diện 10% trên màn hình
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu form gửi đi:", formData);
  };

  return (
    <div
      id="lien-he"
      ref={containerRef}
      className="w-full pt-16 pb-24 bg-transparent font-['Titillium_Web',sans-serif] overflow-hidden"
    >
      <div className="container mx-auto px-[20px] max-w-[1320px]">
        
        {/* Khung Container chính */}
        <div className="relative z-20 bg-white rounded-[4px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col lg:flex-row min-h-[580px]">
          
          {/* ================= CỘT TRÁI: THÔNG TIN LIÊN HỆ ĐỘNG (HIỆU ỨNG TRƯỢT TRÁI) ================= */}
          <div 
            className={`w-full lg:w-[35%] bg-[#ff5a00] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) transform ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
            {/* Hiệu ứng hình khối ẩn mờ nhẹ tạo chiều sâu */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none transform scale-150 blur-xl" />

            <div className="space-y-8 relative z-10">
              {/* Địa chỉ văn phòng */}
              <div>
                <h4 className="text-[12px] uppercase tracking-[0.25em] font-extrabold text-white/70 mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[11px]" /> Văn phòng đại diện
                </h4>
                <p className="text-[16px] font-bold leading-relaxed text-zinc-50">
                  {company?.address || "2307 Beverley Rd Brooklyn, New York 11226 United States."}
                </p>
              </div>

              {/* Kết nối nhanh */}
              <div>
                <h4 className="text-[12px] uppercase tracking-[0.25em] font-extrabold text-white/70 mb-3 flex items-center gap-2">
                  <FaEnvelope className="text-[11px]" /> Kết nối nhanh
                </h4>
                <div className="text-[16px] font-bold space-y-2">
                  <p className="flex flex-wrap gap-1">
                    <span className="text-white/80 font-normal">Email:</span> 
                    <a href={`mailto:${company?.email || 'Promina@7oroof.com'}`} className="hover:text-zinc-900 transition-colors underline underline-offset-4 decoration-white/30">
                      {company?.email || "Promina@7oroof.com"}
                    </a>
                  </p>
                  <p className="flex flex-wrap gap-1">
                    <span className="text-white/80 font-normal">Hỗ trợ:</span> 
                    <a href={`mailto:${company?.email || 'Promina@7oroof.com'}`} className="hover:text-zinc-900 transition-colors underline underline-offset-4 decoration-white/30">
                      {company?.email || "Promina@7oroof.com"}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Phân tách Khung giờ & Hotline */}
            <div className="mt-12 pt-8 border-t border-white/15 space-y-6 relative z-10">
              <p className="text-[14px] font-medium leading-relaxed text-zinc-100 flex items-start gap-2.5">
                <FaRegClock className="text-[14px] mt-1 shrink-0 text-white/80" />
                <span>
                  Chúng tôi sẽ phản hồi lại bạn trong vòng 24 giờ làm việc, hoặc gọi cho chúng tôi hàng ngày, từ <span className="font-black underline decoration-white/40">09:00 AM - 12:00 PM</span>
                </span>
              </p>
              
              {/* Khối Hotline hiển thị lực lưỡng */}
              <div className="flex items-center gap-4 group/phone">
                <div className="w-12 h-12 rounded-sm bg-white/15 flex items-center justify-center text-white shrink-0 group-hover/phone:bg-white group-hover/phone:text-[#ff5a00] group-hover/phone:scale-105 transition-all duration-300 shadow-sm">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-bold">Hotline tư vấn</span>
                  <a href={`tel:${company?.phone || '5565454117'}`} className="text-2xl md:text-3xl font-black tracking-tight text-white transition-colors">
                    {company?.phone || "55 654 541 17"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CỘT PHẢI: FORM ĐĂNG KÝ (HIỆU ỨNG TRƯỢT LÊN + DELAY) ================= */}
          <form 
            onSubmit={handleSubmit} 
            className={`w-full lg:w-[65%] p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white transition-all duration-[1200ms] delay-200 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
          >
            {/* Tiêu đề góc Form */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-[32px] font-black text-zinc-900 uppercase tracking-tight">
                Yêu cầu báo giá
              </h3>
              
              {/* Họa tiết 3 đường kẻ độc quyền */}
              <div className="flex items-center gap-[5px] mt-[12px] mb-[24px]">
                <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
                <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
                <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              </div>

              <p className="text-zinc-400 text-[15px] font-light leading-relaxed max-w-2xl">
                Kiểm soát hoàn toàn quy trình và vật liệu cho phép chúng tôi đảm bảo quý khách hàng luôn nhận được mức giá cạnh tranh đi kèm dịch vụ và chất lượng công trình tốt nhất.
              </p>
            </div>

            {/* Khu vực điền thông tin */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Họ và tên của bạn *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-[54px] px-5 bg-zinc-50 border border-zinc-100 focus:border-[#ff5a00] text-zinc-800 placeholder-zinc-400 font-medium text-[15px] outline-none focus:shadow-[0_0_15px_rgba(255,90,0,0.08)] transition-all duration-300 rounded-[2px]"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại liên hệ *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full h-[54px] px-5 bg-zinc-50 border border-zinc-100 focus:border-[#ff5a00] text-zinc-800 placeholder-zinc-400 font-medium text-[15px] outline-none focus:shadow-[0_0_15px_rgba(255,90,0,0.08)] transition-all duration-300 rounded-[2px]"
                />
              </div>

              <textarea
                rows="4"
                placeholder="Nội dung chi tiết về yêu cầu hoặc dự án của bạn..."
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full p-5 bg-zinc-50 border border-zinc-100 focus:border-[#ff5a00] text-zinc-800 placeholder-zinc-400 font-medium text-[15px] outline-none focus:shadow-[0_0_15px_rgba(255,90,0,0.08)] transition-all duration-300 rounded-[2px] resize-none"
              ></textarea>
            </div>

            {/* Điều khoản bảo mật & Nút Gửi */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
              
              <button
                type="submit"
                className="group relative z-10 overflow-hidden shrink-0 inline-flex items-center justify-between pl-8 pr-2 w-full sm:w-[245px] h-[54px] bg-zinc-900 text-white font-extrabold text-[13px] uppercase tracking-[0.15em] rounded-[2px] transition-colors duration-300 hover:bg-[#ff5a00] shadow-md"
              >
                <span>Gửi yêu cầu</span>
                <span className="w-[38px] h-[38px] bg-white/10 text-white rounded-[1px] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>

              <label className="flex items-center gap-3 cursor-pointer select-none text-zinc-400 hover:text-zinc-600 transition-colors text-[14px] font-medium sm:max-w-md">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                  className="w-4 h-4 accent-[#ff5a00] cursor-pointer shrink-0 rounded-sm"
                />
                <span>Tôi đồng ý với các chính sách và điều khoản bảo mật thông tin.</span>
              </label>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}