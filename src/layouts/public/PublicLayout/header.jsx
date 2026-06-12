import { useEffect, useState } from "react";
import { getCompany } from "../../../api/public/company";
import { useDispatch } from "react-redux";
import { setCompanyRedux } from "../../../features/public/companySlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Header() {
  const [company, setCompany] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll đến section — nếu đang ở trang chủ thì scroll luôn,
  // nếu đang ở trang khác thì navigate về home trước rồi mới scroll
  const handleNavScroll = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
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
    const fetchApi = async () => {
      try {
        const response = await getCompany();
        if (response.status === 200) {
          setCompany(response.data.data);
          dispatch(setCompanyRedux(response.data.data));
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  if (isLoading) return <div className="text-center py-4 text-gray-500 font-medium">Đang tải dữ liệu!</div>;
  if (isError) return <div className="text-center py-4 text-red-500 font-medium">Hệ thống đang gặp sự cố!</div>;

  return (
    <>
      {/* Header for Desktop */}
      <header className="hidden lg:flex w-full h-[120px] bg-[#111111] sticky top-0 z-50 border-b border-[#ffffff0d] font-sans">
        {/* Left Area: Logo Column */}
        <div className="w-[280px] h-full bg-[#151515] flex items-center justify-center px-6 border-r border-[#ffffff0d] shrink-0">
          <a href="/">
            <img
              src={"https://reactheme.com/products/html/elevate/assets/images/logo/02.png"}
              alt="Elevate Logo"
              className="h-[50px] w-auto object-contain"
            />
          </a >
        </div>
        {/* Right Area: Top Info & Bottom Nav */}
        <div className="flex-grow flex flex-col h-full">
          {/* Top Info Bar */}
          <div className="h-[45px] bg-[#191919] border-b border-[#ffffff0d] flex items-center px-8 text-gray-400 text-[12px] font-semibold tracking-wide">
            <div className="flex items-center gap-2 pl-6 h-full py-2 px-8">
              <FaEnvelope className="text-[#ff5a00] text-sm" />
              <a href="mailto:info@example.com" className="hover:text-[#ff5a00] transition-colors">
                {company.email}
              </a>
            </div>
            <div className="flex items-center gap-2 pr-6 border-r border-[#ffffff0d] h-full py-2 px-4">
              <FaPhoneAlt className="text-[#ff5a00] text-sm animate-pulse" />
              <span>{company.phone}</span>
            </div>
            <div className="flex items-center gap-2 px-6 border-r border-[#ffffff0d] h-full py-2">
              <FaMapMarkerAlt className="text-[#ff5a00] text-sm" />
              <span>{company.address}</span>
            </div>
          </div>

          {/* Bottom Nav & Actions Bar */}
          <div className="h-[75px] bg-[#111111] flex items-center justify-between pl-8 pr-0">
            {/* Nav Menu */}
            <nav className="h-full">
              <ul className="flex items-center gap-7 h-full text-white">
                {/* Trang chủ */}
                <li className="h-full flex items-center">
                  <Link to="/" className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] transition-colors">
                    Trang chủ
                  </Link>
                </li>
                <li className="h-full flex items-center">
                  <a
                    href="/#category-section"
                    onClick={(e) => handleNavScroll(e, 'category-section')}
                    className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] transition-colors cursor-pointer"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="h-full flex items-center">
                  <a
                    href="/#post-section"
                    onClick={(e) => handleNavScroll(e, 'post-section')}
                    className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] transition-colors cursor-pointer"
                  >
                    Sản phẩm
                  </a>
                </li>
                <li className="h-full flex items-center">
                  <a
                    href="/#lien-he"
                    onClick={(e) => handleNavScroll(e, 'lien-he')}
                    className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] transition-colors cursor-pointer"
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>

            {/* Actions (Search, Cart, Quote, Menu Toggle) */}
            <div className="flex items-center h-full gap-6 mr-20">
              <div className="h-8 w-[1px] bg-[#ffffff15]"></div>
              {/* Get a Quote Link */}
              <a
                href="#lien-he"
                className="text-[#ff5a00] hover:text-white text-[12px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300"
              >
                Chào mừng!
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Header for Mobile/Tablet */}
      <header className="lg:hidden w-full h-[70px] bg-[#111111] sticky top-0 z-50 flex items-center justify-between px-6 border-b border-[#ffffff0d]">
        <Link to="/">
          <img
            src={company.logo || "https://reactheme.com/products/html/elevate/assets/images/logo/02.png"}
            alt="Elevate Logo"
            className="h-[40px] w-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-[#ff5a00] transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes className="text-[22px]" /> : <FaBars className="text-[22px]" />}
        </button>
      </header>

      {/* Mobile Drawer / Overlay menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#191919] border-t border-[#ffffff0d] shadow-2xl py-6 px-8 flex flex-col gap-6 z-40 text-white">
          <nav className="flex flex-col gap-4">
            {[
              { label: 'Trang chủ', id: null },
              { label: 'Dịch vụ', id: 'category-section' },
              { label: 'Sản phẩm', id: 'post-section' },
              { label: 'Liên hệ', id: 'lien-he' },
            ].map((item) => (
              item.id ? (
                <a
                  key={item.label}
                  href={`/#${item.id}`}
                  onClick={(e) => handleNavScroll(e, item.id)}
                  className="text-[13px] font-extrabold uppercase tracking-wider py-2 border-b border-[#ffffff05] hover:text-[#ff5a00] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[13px] font-extrabold uppercase tracking-wider py-2 border-b border-[#ffffff05] hover:text-[#ff5a00] transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <div className="flex items-center gap-6 pt-4 border-t border-[#ffffff0a]">
            <a
              href="#lien-he"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#ff5a00] hover:bg-white text-white hover:text-black w-full text-center py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300"
            >
              XEM SẢN PHẨM
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;



// Mẩu sau này thêm vào ul là được
// <li className="relative group h-full flex items-center">
//                   <span className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] cursor-pointer transition-colors flex items-center gap-1.5">
//                     Home <FaChevronDown className="text-[9px] text-gray-500 group-hover:text-[#ff5a00] transition-colors" />
//                   </span>
//                   <div className="absolute top-[75px] left-[-150px] w-[900px] max-h-[500px] overflow-y-auto bg-[#191919] shadow-2xl border-t-2 border-[#ff5a00] p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50 rounded-b-md grid grid-cols-4 gap-4">
//                     {homeSubmenus.map((item, idx) => (
//                       <Link key={idx} to="/" className="flex flex-col gap-1.5 group/item text-left">
//                         <div className="w-full h-[80px] bg-gray-800 overflow-hidden rounded-sm relative">
//                           <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
//                         </div>
//                         <span className="text-[11px] font-bold text-gray-300 group-hover/item:text-[#ff5a00] uppercase tracking-wider transition-colors">
//                           {item.title}
//                         </span>
//                       </Link>
//                     ))}
//                   </div>
//                 </li>