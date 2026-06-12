
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaLinkedinIn, 
  FaArrowRight, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaRegClock, 
  FaChevronUp 
} from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const company = useSelector((state) => state.company.company);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFooterScroll = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // Triggers early to allow animations to load smoothly
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="rts-footer-area footer-one bg-image relative overflow-hidden border-t border-t-2 border-[#ff5a00]" 
      style={{
        color: '#9e9e9e',
        fontFamily: '"Archivo", sans-serif'
      }}
    >
      {/* Top Border Glow Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent z-10" />

      {/* Background Image with Cinematic Ken Burns Zoom Effect */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out ${
          isVisible ? "scale-105" : "scale-100"
        }`}
        style={{
          backgroundImage: 'url("https://reactheme.com/products/html/elevate/assets/images/footer/01.jpg")',
          backgroundColor: '#111111',
        }}
      />

      {/* Dark Overlay to match contrast */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none z-0"></div>

      {/* Floating Shapes in Footer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
        <img
          src="https://reactheme.com/products/html/elevate/assets/images/banner/shape/01.png"
          alt="shape-1"
          className="absolute left-[5%] bottom-[20%] w-[80px] opacity-[0.03] animate-[spin_25s_linear_infinite]"
        />
        <img
          src="https://reactheme.com/products/html/elevate/assets/images/banner/shape/02.png"
          alt="shape-2"
          className="absolute right-[8%] top-[15%] w-[100px] opacity-[0.03] animate-[bounce_8s_infinite]"
        />
      </div>

      <div className="container mx-auto px-[20px] max-w-[1320px] relative z-10">
        {/* Footer Top Area (Newsletter Subscription) */}
        <div className={`flex flex-wrap items-center justify-between py-[60px] border-b border-[#ffffff0d] gap-[30px] transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}>
          {/* Logo Area */}
          <div className="logo-area border border-[#ffffff10] p-[20px] bg-black/30 backdrop-blur-sm hover:border-[#ff5a00] transition-colors duration-300">
            <img 
              src="https://reactheme.com/products/html/elevate/assets/images/logo/02.png" 
              alt="Elevate Construction Logo" 
              className="h-[45px] w-auto" 
            />
          </div>

          {/* Heading */}
          <h4 className="text-[20px] md:text-[28px] font-extrabold text-white leading-[1.3] uppercase tracking-wide max-w-[420px]">
            12 năm đồng hành <br />tạo nên thương hiệu  
          </h4>

          {/* Subscribe Form */}
          <div className="subscribe-area w-full lg:w-auto">
            <form className="flex w-full lg:w-[450px]" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#161616] border border-[#262626] px-[20px] py-[15px] outline-none text-white placeholder-gray-500 focus:border-[#ff5a00] focus:shadow-[0_0_15px_rgba(255,90,0,0.15)] transition-all text-[15px]"
              />
              <button 
                type="submit"
                className="bg-[#ff5a00] hover:bg-white hover:text-black text-white px-[25px] py-[15px] font-bold text-[14px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Nhận tự vấn
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] py-[80px]">
          {/* About Company */}
          <div className={`single-footer-inner transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100 delay-200" : "translate-y-12 opacity-0 delay-0"
          }`}>
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Chúng tôi
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <p className="text-[15px] leading-[26px] mb-[25px] text-gray-400 font-medium">
                Chúng tôi chuyên cung cấp dịch vụ về cơ khí, uy tín chất lượng
            </p>
            <div className="flex gap-[10px]">
              {[
                { icon: <FaFacebookF />, link: 'https://www.facebook.com/co.khi.nguyen.may' },
                { icon: <FaTwitter />, link: '#' },
                { icon: <FaYoutube />, link: '#' },
                { icon: <FaLinkedinIn />, link: '#' }
              ].map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  className="w-[40px] h-[40px] flex items-center justify-center bg-[#161616] border border-[#ffffff0d] rounded-sm text-gray-300 hover:bg-[#ff5a00] hover:border-[#ff5a00] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className={`single-footer-inner transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100 delay-400" : "translate-y-12 opacity-0 delay-0"
          }`}>
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Xem thêm
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <ul className="space-y-[15px]">
              {[
                { label: 'Thông tin doanh nghiệp', sectionId: 'lien-he' },
                { label: 'Sản phẩm', sectionId: 'post-section' },
                { label: 'Dịch vụ', sectionId: 'category-section' },
                { label: 'Liên hệ', sectionId: 'lien-he' },
              ].map(item => (
                <li key={item.label}>
                  <a
                    href={`/#${item.sectionId}`}
                    onClick={(e) => handleFooterScroll(e, item.sectionId)}
                    className="group text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 flex items-center gap-3 text-[15px] font-medium cursor-pointer"
                  >
                    <FaArrowRight className="text-[12px] text-gray-500 group-hover:text-[#ff5a00] group-hover:translate-x-1 transition-all duration-300 shrink-0" /> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className={`single-footer-inner transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100 delay-600" : "translate-y-12 opacity-0 delay-0"
          }`}>
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Liên hệ
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <div className="space-y-[20px]">
              <div className="flex items-start gap-4 group">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px] group-hover:scale-110 transition-transform duration-300">
                  <FaPhoneAlt />
                </div>
                <a href={`tel:${company.phone}`} className="text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 text-[15px] font-medium pt-1">
                  {company.phone}
                </a>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px] group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope />
                </div>
                <a href="mailto:cokhinguyenmay@gmail.com" className="text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 text-[15px] font-medium pt-1">
                  {company.email}
                </a>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px] group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-gray-400 text-[15px] font-medium leading-[22px]">
                  {company.address}
                </span>
              </div>
            </div>
          </div>

          {/* Popular Posts */}
          <div className={`single-footer-inner transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100 delay-800" : "translate-y-12 opacity-0 delay-0"
          }`}>
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Bài viết
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <div className="space-y-[20px]">
                <div className="flex gap-4 group/post">
                  <div className="overflow-hidden rounded-sm shrink-0 w-[80px] h-[75px]">
                    <img
                      src={`https://images.unsplash.com/photo-1734888369502-3e01d4c0a46e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JpbmRpbmclMjBtYWNoaW5lfGVufDB8fDB8fHww`}
                      alt="Post Thumbnail"
                      className="w-full h-full object-cover bg-gray-800 transition-transform duration-500 group-hover/post:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <span className="text-[13px] text-gray-500 flex items-center gap-2">
                      <FaRegClock className="text-[#ff5a00]" /> 21 tháng 05
                    </span>
                    <h6 className="text-white font-bold text-[14px] leading-tight hover:text-[#ff5a00] cursor-pointer transition-colors duration-300 block">
                      Cách sử dụng máy mài an toàn
                    </h6>
                    <a href="#" className="text-[#ff5a00] hover:text-white transition-colors duration-300 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 mt-1">
                      XEM THÊM <FaArrowRight className="text-[10px]" />
                    </a>
                  </div>
                </div>
                 <div className="flex gap-4 group/post">
                  <div className="overflow-hidden rounded-sm shrink-0 w-[80px] h-[75px]">
                    <img
                      src={`https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvbWV8ZW58MHx8MHx8fDA%3D`}
                      alt="Post Thumbnail"
                      className="w-full h-full object-cover bg-gray-800 transition-transform duration-500 group-hover/post:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <span className="text-[13px] text-gray-500 flex items-center gap-2">
                      <FaRegClock className="text-[#ff5a00]" /> 14 tháng 02
                    </span>
                    <h6 className="text-white font-bold text-[14px] leading-tight hover:text-[#ff5a00] cursor-pointer transition-colors duration-300 block">
                      Cần bao nhiêu vật liệu để thi công công trình?
                    </h6>
                    <a href="#" className="text-[#ff5a00] hover:text-white transition-colors duration-300 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 mt-1">
                      XEM THÊM <FaArrowRight className="text-[10px]" />
                    </a>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Copyright Area */}
      <div className="copyright-area py-[24px] border-t border-[#ffffff0d] bg-black/40 relative z-10">
        <div className="container mx-auto px-[20px] max-w-[1320px] flex justify-between items-center flex-wrap gap-4">
          <p className="text-[14px] text-gray-500 w-full text-center">
            Copyright 2026 by Nguyen Van Giau. All Rights Reserved.
          </p>
        </div>

        {/* Back to top button */}
        <button 
          onClick={scrollToTop}
          className="absolute right-[30px] bottom-[30px] w-[45px] h-[45px] bg-[#ff5a00] hover:bg-white text-white hover:text-black flex items-center justify-center rounded-full transition-all duration-300 shadow-lg cursor-pointer hover:-translate-y-1"
          aria-label="Back to top"
        >
          <FaChevronUp className="text-[16px]" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
