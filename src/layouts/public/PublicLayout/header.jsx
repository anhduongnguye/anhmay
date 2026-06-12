import { useEffect, useState, useRef } from "react";
import { getCompany } from "../../../api/public/company";
import { useDispatch } from "react-redux";
import { setCompanyRedux } from "../../../features/public/companySlice";
import { Link } from "react-router-dom";
import { useScrollToSection } from "../../../hooks/useScrollToSection";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Header() {
  const [company, setCompany] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const dispatch = useDispatch();
  const scrollToSection = useScrollToSection();

  const closeMenu = () => setIsMenuOpen(false);

  useFocusTrap(menuRef, isMenuOpen, closeMenu);

  const handleNavScroll = (e, sectionId) => {
    scrollToSection(sectionId, e);
    closeMenu();
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
  }, [dispatch]);

  if (isLoading) return <div className="text-center py-4 text-gray-500 font-medium">Đang tải dữ liệu!</div>;
  if (isError) return <div className="text-center py-4 text-red-500 font-medium">Hệ thống đang gặp sự cố!</div>;

  const navItems = [
    { label: 'Trang chủ', to: '/', sectionId: null },
    { label: 'Dịch vụ', sectionId: 'category-section' },
    { label: 'Sản phẩm', sectionId: 'post-section' },
    { label: 'Liên hệ', sectionId: 'lien-he' },
  ];

  return (
    <>
      {/* Header for Desktop */}
      <header className="hidden lg:flex w-full h-[120px] bg-[#111111] sticky top-0 z-50 border-b border-[#ffffff0d] font-sans">
        <div className="w-[280px] h-full bg-[#151515] flex items-center justify-center px-6 border-r border-[#ffffff0d] shrink-0">
          <Link to="/" aria-label="Về trang chủ">
            <img
              src={"https://reactheme.com/products/html/elevate/assets/images/logo/02.png"}
              alt="Elevate Logo"
              className="h-[50px] w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex-grow flex flex-col h-full">
          <div className="h-[45px] bg-[#191919] border-b border-[#ffffff0d] flex items-center px-8 text-gray-400 text-[12px] font-semibold tracking-wide">
            <div className="flex items-center gap-2 pl-6 h-full py-2 px-8">
              <FaEnvelope className="text-[#ff5a00] text-sm" />
              <a href={`mailto:${company.email}`} className="hover:text-[#ff5a00] transition-colors">
                {company.email}
              </a>
            </div>
            <div className="flex items-center gap-2 pr-6 border-r border-[#ffffff0d] h-full py-2 px-4">
              <FaPhoneAlt className="text-[#ff5a00] text-sm animate-pulse" />
              <a href={`tel:${company.phone}`} className="hover:text-[#ff5a00] transition-colors">
                {company.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 px-6 border-r border-[#ffffff0d] h-full py-2">
              <FaMapMarkerAlt className="text-[#ff5a00] text-sm" />
              <span>{company.address}</span>
            </div>
          </div>

          <div className="h-[75px] bg-[#111111] flex items-center justify-between pl-8 pr-0">
            <nav className="h-full" aria-label="Điều hướng chính">
              <ul className="flex items-center gap-7 h-full text-white">
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

            <div className="flex items-center h-full gap-6 mr-20">
              <div className="h-8 w-[1px] bg-[#ffffff15]"></div>
              <a
                href="/#lien-he"
                onClick={(e) => handleNavScroll(e, 'lien-he')}
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
        <Link to="/" aria-label="Về trang chủ">
          <img
            src={company.logo || "https://reactheme.com/products/html/elevate/assets/images/logo/02.png"}
            alt="Elevate Logo"
            className="h-[40px] w-auto object-contain"
          />
        </Link>
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-[#ff5a00] transition-colors p-1"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMenuOpen ? <FaTimes className="text-[22px]" /> : <FaBars className="text-[22px]" />}
        </button>
      </header>

      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 top-[70px] bg-black/50 z-30 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        id="mobile-nav"
        role="dialog"
        aria-modal={isMenuOpen}
        aria-hidden={!isMenuOpen}
        aria-label="Menu điều hướng"
        inert={isMenuOpen ? undefined : ''}
        className={`lg:hidden fixed inset-x-0 top-[70px] bg-[#191919] border-t border-[#ffffff0d] shadow-2xl py-6 px-8 flex flex-col gap-6 z-40 text-white transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4" aria-label="Điều hướng di động">
          {navItems.map((item) =>
            item.sectionId ? (
              <a
                key={item.label}
                href={`/#${item.sectionId}`}
                onClick={(e) => handleNavScroll(e, item.sectionId)}
                className="text-[13px] font-extrabold uppercase tracking-wider py-2 border-b border-[#ffffff05] hover:text-[#ff5a00] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to="/"
                onClick={closeMenu}
                className="text-[13px] font-extrabold uppercase tracking-wider py-2 border-b border-[#ffffff05] hover:text-[#ff5a00] transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-6 pt-4 border-t border-[#ffffff0a]">
          <a
            href="/#post-section"
            onClick={(e) => handleNavScroll(e, 'post-section')}
            className="bg-[#ff5a00] hover:bg-white text-white hover:text-black w-full text-center py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300"
          >
            XEM SẢN PHẨM
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
