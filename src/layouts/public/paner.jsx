import { useState, useEffect } from "react";
import { scrollToElement } from "../../utils/motion";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaArrowUpRightFromSquare
} from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

function Paner({ company }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const cleanId = targetId.replace("#", "");
    scrollToElement(document.getElementById(cleanId));
  };

  const slides = [
    {
      preTitle: "CƠ KHÍ NGUYỄN MAY - 12 NĂM ĐỈNH CAO CHẤT LƯỢNG",
      title: "Cơ khí nguyễn may\nThành phố huế\nHồ chí minh",
      description: "Khẳng định đẳng cấp qua hàng ngàn công trình. Chúng tôi biến bản vẽ phức tạp nhất thành những sản phẩm cơ khí chính xác đến từng milimet, bền bỉ cùng thời gian.",
      bgImage: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2VsZGluZyUyMHNwYXJrc3xlbnwwfHwwfHx8MA%3D%3D", // Bạn thay ảnh xưởng cơ khí của bạn vào đây nhé
      projectLink: "#post-section",
      serviceLink: "#category-section",
    },
    {
      preTitle: "THƯƠNG HIỆU CƠ KHÍ UY TÍN HÀNG ĐẦU",
      title: "Giải Pháp Cơ Khí\nBứt Phá Mọi\nGiới Hạn",
      description: "Sở hữu trang thiết bị tân tiến cùng đội ngũ kỹ sư lão luyện. Nguyễn May tự hào là điểm tựa vững chắc, cung ứng giải pháp gia công và lắp đặt cơ khí toàn diện cho mọi doanh nghiệp.",
      bgImage: "https://images.unsplash.com/photo-1609348632802-b952f368fc3a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2VsZGluZyUyMHNwYXJrc3xlbnwwfHwwfHx8MA%3D%3D",
      projectLink: "#post-section",
      serviceLink: "#category-section",
    },
    {
      preTitle: "DẪN ĐẦU CÔNG NGHỆ CHẾ TẠO",
      title: "Chất Lượng Vàng\nKiến Tạo Những\nThành Công",
      description: "12 năm chinh chiến, chúng tôi không chỉ làm ra sản phẩm, chúng tôi tạo nên những giá trị trường tồn. Cam kết tiến độ thần tốc, bảo hành tối ưu, làm hài lòng cả những khách hàng khó tính nhất.",
      bgImage: "https://plus.unsplash.com/premium_photo-1661963236181-9eb0c8d766e3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFdlbGRpbmclMjBzcGFya3N8ZW58MHx8MHx8fDA%3D",
      projectLink: "#post-section",
      serviceLink: "#category-section",
    }
  ]
 

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-black font-sans">

      {/* Sticky Social Media Panel (Desktop Only) */}
      <div className="absolute left-0 top-0 bottom-0 w-[80px] bg-[#111111] border-r border-[#ffffff0d] hidden xl:flex flex-col items-center justify-between py-12 z-20">
        <div className="flex flex-col gap-5 text-gray-500">
          <a href="https://www.facebook.com/co.khi.nguyen.may" target="blank" className="hover:text-[#ff5a00] transition-colors duration-300 p-2"><FaFacebookF className="text-sm" /></a>
          <a href="#" className="hover:text-[#ff5a00] transition-colors duration-300 p-2"><FaTwitter className="text-sm" /></a>
          <a href="#" className="hover:text-[#ff5a00] transition-colors duration-300 p-2"><FaYoutube className="text-sm" /></a>
          <a href="#" className="hover:text-[#ff5a00] transition-colors duration-300 p-2"><FaLinkedinIn className="text-sm" /></a>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1px] h-[80px] bg-[#ffffff15]"></div>
          {/* Vertical Text */}
          <div className="rotate-90 origin-center text-[10px] font-extrabold uppercase tracking-[0.25em] text-gray-400 select-none whitespace-nowrap py-4">
            THEO DÕI
          </div>
        </div>
      </div>

      {/* Floating Shape Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <img
          src="https://reactheme.com/products/html/elevate/assets/images/banner/shape/01.png"
          alt="shape-1"
          className="absolute left-[120px] top-[15%] w-[100px] opacity-15 animate-bounce duration-5000"
        />
        <img
          src="https://reactheme.com/products/html/elevate/assets/images/banner/shape/02.png"
          alt="shape-2"
          className="absolute right-[10%] bottom-[15%] w-[120px] opacity-15 animate-pulse duration-3000"
        />
      </div>

      {/* Slides Wrapper */}
      <div className="w-full h-full relative">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const showContent = isActive && isMounted;

          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              {/* Background Image with Cinematic Ken Burns Zoom Effect */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out ${showContent ? "scale-105" : "scale-100"
                  }`}
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
              {/* Dark Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

              {/* Slide Content */}
              <div className="container mx-auto px-6 md:px-12 h-full flex items-center relative z-10 pl-6 xl:pl-36">
                <div className="max-w-[750px]">
                  <span className={`text-[#ff5a00] text-[12px] md:text-[14px] font-extrabold uppercase tracking-[0.3em] mb-4 block transition-all transform ${showContent ? "translate-y-0 opacity-100 duration-700 delay-300" : "translate-y-8 opacity-0 duration-300 delay-0"
                    }`}>
                    {slide.preTitle}
                  </span>

                  <h1 className={`text-white text-[32px] md:text-[56px] lg:text-[68px] font-extrabold uppercase leading-[1.15] mb-5 tracking-tight whitespace-pre-line transition-all transform ${showContent ? "translate-y-0 opacity-100 duration-700 delay-500" : "translate-y-8 opacity-0 duration-300 delay-0"
                    }`}>
                    {slide.title}
                  </h1>

                  <p className={`text-gray-300 text-[14px] md:text-[16px] leading-relaxed mb-8 max-w-[600px] transition-all transform ${showContent ? "translate-y-0 opacity-100 duration-700 delay-700" : "translate-y-8 opacity-0 duration-300 delay-0"
                    }`}>
                    {slide.description}
                  </p>

                  <div className={`flex items-center gap-4 transition-all transform ${showContent ? "translate-y-0 opacity-100 duration-700 delay-900" : "translate-y-8 opacity-0 duration-300 delay-0"
                    }`}>
                    <a
                      href={slide.projectLink}
                      onClick={(e) => handleScroll(e, slide.projectLink)}
                      className="inline-flex items-center gap-2 bg-[#ff5a00] hover:bg-white text-white hover:text-black py-4 px-8 font-extrabold text-[11px] uppercase tracking-widest transition-colors duration-300"
                    >
                      XEM SẢN PHẨM
                    </a>
                    <a
                      href={slide.serviceLink}
                      onClick={(e) => handleScroll(e, slide.serviceLink)}
                      className="inline-flex items-center border border-white/20 hover:border-[#ff5a00] hover:bg-[#ff5a00] text-white py-4 px-8 font-extrabold text-[11px] uppercase tracking-widest transition-all duration-300"
                    >
                      DỊCH VỤ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination dots (Bottom Right) */}
      <div className="absolute bottom-8 right-6 md:right-12 flex items-center gap-3.5 z-25">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${idx === activeIndex
                ? "w-7 h-2 bg-[#ff5a00]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Paner;