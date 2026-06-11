
import React from 'react';
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="rts-footer-area footer-one bg-image relative" 
      style={{
        backgroundImage: 'url("https://reactheme.com/products/html/elevate/assets/images/footer/01.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#111111',
        color: '#9e9e9e',
        fontFamily: '"Archivo", sans-serif'
      }}
    >
      {/* Dark Overlay to match the screenshot's contrast */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none"></div>

      <div className="container mx-auto px-[20px] max-w-[1320px] relative z-10">
        {/* Footer Top Area (Newsletter Subscription) */}
        <div className="flex flex-wrap items-center justify-between py-[60px] border-b border-[#ffffff0d] gap-[30px]">
          {/* Logo Area */}
          <div className="logo-area border border-[#ffffff10] p-[20px] bg-black/30 backdrop-blur-sm">
            <img 
              src="https://reactheme.com/products/html/elevate/assets/images/logo/02.png" 
              alt="Elevate Construction Logo" 
              className="h-[45px] w-auto" 
            />
          </div>

          {/* Heading */}
          <h4 className="text-[20px] md:text-[28px] font-extrabold text-white leading-[1.3] uppercase tracking-wide max-w-[420px]">
            Subscribe Our Newsletter <br /> For Latest Updates
          </h4>

          {/* Subscribe Form */}
          <div className="subscribe-area w-full lg:w-auto">
            <form className="flex w-full lg:w-[450px]" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#161616] border border-[#262626] px-[20px] py-[15px] outline-none text-white placeholder-gray-500 focus:border-[#ff5a00] transition-colors text-[15px]"
              />
              <button 
                type="submit"
                className="bg-[#ff5a00] hover:bg-white hover:text-black text-white px-[25px] py-[15px] font-bold text-[14px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] py-[80px]">
          {/* About Company */}
          <div className="single-footer-inner">
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              About Company
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <p className="text-[15px] leading-[26px] mb-[25px] text-gray-400 font-medium">
              Centric aplications productize before front end vortals visualize front end is results and value added
            </p>
            <div className="flex gap-[10px]">
              {[
                { icon: <FaFacebookF />, link: '#' },
                { icon: <FaTwitter />, link: '#' },
                { icon: <FaYoutube />, link: '#' },
                { icon: <FaLinkedinIn />, link: '#' }
              ].map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  className="w-[40px] h-[40px] flex items-center justify-center bg-[#161616] border border-[#ffffff0d] rounded-sm text-gray-300 hover:bg-[#ff5a00] hover:border-[#ff5a00] hover:text-white transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="single-footer-inner">
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Useful Links
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <ul className="space-y-[15px]">
              {['About Us', 'Our Gallery', 'Our Services', 'Our Team', 'Contact Us'].map(link => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 flex items-center gap-3 text-[15px] font-medium"
                  >
                    <FaArrowRight className="text-[12px] text-gray-500 shrink-0" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="single-footer-inner">
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Contact Us
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <div className="space-y-[20px]">
              <div className="flex items-start gap-4">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px]">
                  <FaPhoneAlt />
                </div>
                <a href="tel:+254982156213" className="text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 text-[15px] font-medium pt-1">
                  +254 (98) 2156 213
                </a>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px]">
                  <FaPhoneAlt />
                </div>
                <a href="tel:+254982156213" className="text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 text-[15px] font-medium pt-1">
                  +254 (98) 2156 213
                </a>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px]">
                  <FaEnvelope />
                </div>
                <a href="mailto:info@elevate.com" className="text-gray-400 hover:text-[#ff5a00] transition-colors duration-300 text-[15px] font-medium pt-1">
                  info@elevate.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#ff5a00] text-white shrink-0 rounded-sm text-[14px]">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-gray-400 text-[15px] font-medium leading-[22px]">
                  25 Helano, 145 City Road <br /> New Town DD14, USA
                </span>
              </div>
            </div>
          </div>

          {/* Popular Posts */}
          <div className="single-footer-inner">
            <h6 className="footer-title text-white text-[18px] font-extrabold uppercase tracking-wider">
              Popular Posts
            </h6>
            {/* Custom line pattern */}
            <div className="flex items-center gap-[5px] mt-[12px] mb-[30px]">
              <div className="h-[2px] w-[35px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
              <div className="h-[2px] w-[8px] bg-[#ff5a00]"></div>
            </div>
            <div className="space-y-[20px]">
              {[1, 2].map(post => (
                <div key={post} className="flex gap-4">
                  <img
                    src={`https://reactheme.com/products/html/elevate/assets/images/footer/0${post}.png`}
                    alt="Post Thumbnail"
                    className="w-[80px] h-[75px] object-cover rounded-sm bg-gray-800 shrink-0"
                  />
                  <div className="flex flex-col justify-between py-1">
                    <span className="text-[13px] text-gray-500 flex items-center gap-2">
                      <FaRegClock className="text-[#ff5a00]" /> 15th April, 2022
                    </span>
                    <h7 className="text-white font-bold text-[14px] leading-tight hover:text-[#ff5a00] cursor-pointer transition-colors duration-300 block">
                      Building Renovation Tasks
                    </h7>
                    <a href="#" className="text-[#ff5a00] hover:text-white transition-colors duration-300 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5 mt-1">
                      Read More <FaArrowRight className="text-[10px]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Area */}
      <div className="copyright-area py-[24px] border-t border-[#ffffff0d] bg-black/40 relative z-10">
        <div className="container mx-auto px-[20px] max-w-[1320px] flex justify-between items-center flex-wrap gap-4">
          <p className="text-[14px] text-gray-500 w-full text-center">
            Copyright 2023 Elevate. All Rights Reserved.
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
