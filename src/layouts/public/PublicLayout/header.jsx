import { useEffect, useState } from "react";
import { getCompany } from "../../../api/public/company";
import { useDispatch } from "react-redux";
import { setCompanyRedux } from "../../../features/public/companySlice";
import { Link } from "react-router-dom";
import {
  FaBolt,
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

  const homeSubmenus = [
    { title: "Main Construction", img: "https://reactheme.com/products/html/elevate/assets/images/preview/01.jpg" },
    { title: "Construction Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/02.jpg" },
    { title: "Renovation Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/03.jpg" },
    { title: "Factory Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/04.jpg" },
    { title: "Building Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/05.jpg" },
    { title: "Architecture Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/06.jpg" },
    { title: "Handyman Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/08.jpg" },
    { title: "Engineering Home", img: "https://reactheme.com/products/html/elevate/assets/images/preview/07.jpg" },
    { title: "Home Industrial", img: "https://reactheme.com/products/html/elevate/assets/images/preview/09.jpg" },
    { title: "Home Solar Energy", img: "https://reactheme.com/products/html/elevate/assets/images/preview/10.jpg" },
    { title: "Interior Design", img: "https://reactheme.com/products/html/elevate/assets/images/preview/11.jpg" },
    { title: "Construction Workshop", img: "https://reactheme.com/products/html/elevate/assets/images/preview/12.jpg" },
    { title: "Business Investor", img: "https://reactheme.com/products/html/elevate/assets/images/preview/13.jpg" }
  ];

  return (
    <>
      {/* Header for Desktop */}
      <header className="hidden lg:flex w-full h-[120px] bg-[#111111] sticky top-0 z-50 border-b border-[#ffffff0d] font-sans">
        {/* Left Area: Logo Column */}
        <div className="w-[280px] h-full bg-[#151515] flex items-center justify-center px-6 border-r border-[#ffffff0d] shrink-0">
          <Link to="/">
            <img
              src={company.logo || "https://reactheme.com/products/html/elevate/assets/images/logo/02.png"}
              alt="Elevate Logo"
              className="h-[50px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right Area: Top Info & Bottom Nav */}
        <div className="flex-grow flex flex-col h-full">
          {/* Top Info Bar */}
          <div className="h-[45px] bg-[#191919] border-b border-[#ffffff0d] flex items-center px-8 text-gray-400 text-[12px] font-semibold tracking-wide">
            <div className="flex items-center gap-2 pr-6 border-r border-[#ffffff0d] h-full py-2">
              <FaBolt className="text-[#ff5a00] text-sm animate-pulse" />
              <span>We will go through all the stages of construction</span>
            </div>
            <div className="flex items-center gap-2 px-6 border-r border-[#ffffff0d] h-full py-2">
              <FaMapMarkerAlt className="text-[#ff5a00] text-sm" />
              <span>203 Madison Ave, New York, USA</span>
            </div>
            <div className="flex items-center gap-2 pl-6 h-full py-2">
              <FaEnvelope className="text-[#ff5a00] text-sm" />
              <a href="mailto:info@example.com" className="hover:text-[#ff5a00] transition-colors">
                info@example.com
              </a>
            </div>
          </div>

          {/* Bottom Nav & Actions Bar */}
          <div className="h-[75px] bg-[#111111] flex items-center justify-between pl-8 pr-0">
            {/* Nav Menu */}
            <nav className="h-full">
              <ul className="flex items-center gap-7 h-full text-white">
                {/* Home Mega-Menu */}
                <li className="relative group h-full flex items-center">
                  <span className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] cursor-pointer transition-colors flex items-center gap-1.5">
                    Home <FaChevronDown className="text-[9px] text-gray-500 group-hover:text-[#ff5a00] transition-colors" />
                  </span>
                  <div className="absolute top-[75px] left-[-150px] w-[900px] max-h-[500px] overflow-y-auto bg-[#191919] shadow-2xl border-t-2 border-[#ff5a00] p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50 rounded-b-md grid grid-cols-4 gap-4">
                    {homeSubmenus.map((item, idx) => (
                      <Link key={idx} to="/" className="flex flex-col gap-1.5 group/item text-left">
                        <div className="w-full h-[80px] bg-gray-800 overflow-hidden rounded-sm relative">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                        </div>
                        <span className="text-[11px] font-bold text-gray-300 group-hover/item:text-[#ff5a00] uppercase tracking-wider transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </li>

                {/* Pages Dropdown with Multi-Level Submenus */}
                <li className="relative group h-full flex items-center">
                  <span className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] cursor-pointer transition-colors flex items-center gap-1.5">
                    Pages <FaChevronDown className="text-[9px] text-gray-500 group-hover:text-[#ff5a00] transition-colors" />
                  </span>
                  <ul className="absolute top-[75px] left-0 bg-[#191919] shadow-xl border-t-2 border-[#ff5a00] py-3 px-4 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50 rounded-b-md flex flex-col gap-2.5">
                    {/* Who We Are Multi-level */}
                    <li className="relative group/lvl2">
                      <span className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors flex items-center justify-between py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider cursor-pointer">
                        Who We Are <FaChevronRight className="text-[8px] text-gray-500" />
                      </span>
                      <ul className="absolute left-full top-0 ml-2 bg-[#191919] shadow-xl border-l-2 border-[#ff5a00] py-3 px-4 min-w-[180px] opacity-0 invisible group-hover/lvl2:opacity-100 group-hover/lvl2:visible transition-all duration-300 translate-x-2 group-hover/lvl2:translate-x-0 z-50 flex flex-col gap-2">
                        {['About', 'Vision', 'Careers', 'Gallery', 'Safety', 'Sustainability'].map(sub => (
                          <li key={sub}>
                            <Link to="/" className="text-[11px] font-bold text-gray-400 hover:text-[#ff5a00] uppercase tracking-wider block py-1">{sub}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                        Our History
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                        Team
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                        Team Details
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                        Appointment
                      </Link>
                    </li>
                    {/* Shop Multi-level */}
                    <li className="relative group/lvl2">
                      <span className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors flex items-center justify-between py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider cursor-pointer">
                        Shop <FaChevronRight className="text-[8px] text-gray-500" />
                      </span>
                      <ul className="absolute left-full top-0 ml-2 bg-[#191919] shadow-xl border-l-2 border-[#ff5a00] py-3 px-4 min-w-[180px] opacity-0 invisible group-hover/lvl2:opacity-100 group-hover/lvl2:visible transition-all duration-300 translate-x-2 group-hover/lvl2:translate-x-0 z-50 flex flex-col gap-2">
                        {['Shop', 'Single Product', 'Cart', 'Checkout', 'Account'].map(sub => (
                          <li key={sub}>
                            <Link to="/" className="text-[11px] font-bold text-gray-400 hover:text-[#ff5a00] uppercase tracking-wider block py-1">{sub}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/* Contact Multi-level */}
                    <li className="relative group/lvl2">
                      <span className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors flex items-center justify-between py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider cursor-pointer">
                        Contact <FaChevronRight className="text-[8px] text-gray-500" />
                      </span>
                      <ul className="absolute left-full top-0 ml-2 bg-[#191919] shadow-xl border-l-2 border-[#ff5a00] py-3 px-4 min-w-[180px] opacity-0 invisible group-hover/lvl2:opacity-100 group-hover/lvl2:visible transition-all duration-300 translate-x-2 group-hover/lvl2:translate-x-0 z-50 flex flex-col gap-2">
                        {['Contact One', 'Contact Two'].map(sub => (
                          <li key={sub}>
                            <Link to="/" className="text-[11px] font-bold text-gray-400 hover:text-[#ff5a00] uppercase tracking-wider block py-1">{sub}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 uppercase tracking-wider">
                        Error 404
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Service Dropdown */}
                <li className="relative group h-full flex items-center">
                  <span className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] cursor-pointer transition-colors flex items-center gap-1.5">
                    Service <FaChevronDown className="text-[9px] text-gray-500 group-hover:text-[#ff5a00] transition-colors" />
                  </span>
                  <ul className="absolute top-[75px] left-0 bg-[#191919] shadow-xl border-t-2 border-[#ff5a00] py-3 px-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50 rounded-b-md flex flex-col gap-2.5">
                    {['Service Style 1', 'Service Style 2', 'Service Style 3', 'Service Details'].map(sub => (
                      <li key={sub}>
                        <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Portfolio Dropdown */}
                <li className="relative group h-full flex items-center">
                  <span className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] cursor-pointer transition-colors flex items-center gap-1.5">
                    Portfolio <FaChevronDown className="text-[9px] text-gray-500 group-hover:text-[#ff5a00] transition-colors" />
                  </span>
                  <ul className="absolute top-[75px] left-0 bg-[#191919] shadow-xl border-t-2 border-[#ff5a00] py-3 px-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50 rounded-b-md flex flex-col gap-2.5">
                    {['Project', 'Project Details'].map(sub => (
                      <li key={sub}>
                        <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Blog Dropdown */}
                <li className="relative group h-full flex items-center">
                  <span className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] cursor-pointer transition-colors flex items-center gap-1.5">
                    Blog <FaChevronDown className="text-[9px] text-gray-500 group-hover:text-[#ff5a00] transition-colors" />
                  </span>
                  <ul className="absolute top-[75px] left-0 bg-[#191919] shadow-xl border-t-2 border-[#ff5a00] py-3 px-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50 rounded-b-md flex flex-col gap-2.5">
                    {['Blog List', 'Blog Grid', 'Blog Details'].map(sub => (
                      <li key={sub}>
                        <Link to="/" className="text-[12px] font-bold text-gray-300 hover:text-[#ff5a00] transition-colors block py-1 border-b border-[#ffffff0a] pb-1.5 uppercase tracking-wider">
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="h-full flex items-center">
                  <a href="#lien-he" className="text-[12px] font-extrabold uppercase tracking-widest hover:text-[#ff5a00] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Actions (Search, Cart, Quote, Menu Toggle) */}
            <div className="flex items-center h-full gap-6">
              {/* Search & Cart */}
              <div className="flex items-center gap-5 text-white">
                <button className="hover:text-[#ff5a00] transition-colors cursor-pointer p-1">
                  <FaSearch className="text-[16px]" />
                </button>
                <button className="hover:text-[#ff5a00] transition-colors cursor-pointer p-1 relative">
                  <FaShoppingCart className="text-[16px]" />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-[#ff5a00] text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-[1px] bg-[#ffffff15]"></div>

              {/* Get a Quote Link */}
              <a
                href="#lien-he"
                className="text-[#ff5a00] hover:text-white text-[12px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300"
              >
                Get a Quote
                <svg className="w-3 h-3 transform translate-y-[-0.5px]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>

              {/* White Hamburger Box */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-white hover:bg-gray-200 text-black h-[75px] w-[75px] flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-300"
                aria-label="Toggle Menu"
              >
                <FaBars className="text-[20px]" />
              </button>
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
            {['Home', 'Pages', 'Service', 'Portfolio', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Contact' ? '#lien-he' : '#'}
                onClick={() => setIsMenuOpen(false)}
                className="text-[13px] font-extrabold uppercase tracking-wider py-2 border-b border-[#ffffff05] hover:text-[#ff5a00] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6 pt-4 border-t border-[#ffffff0a]">
            <a
              href="#lien-he"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#ff5a00] hover:bg-white text-white hover:text-black w-full text-center py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
