import { useEffect, useState } from "react";
import { getCompany } from "../../../api/public/company";
import Contact from "./contact";
import { useDispatch } from "react-redux";
import { setCompanyRedux } from "../../../features/public/companySlice"
import { Link } from "react-router-dom";


function Header() {

  const [company, setCompany] = useState({})
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getCompany();
        if (response.status === 200) {
          setCompany(response.data.data);
          dispatch(setCompanyRedux(response.data.data))
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  if (isLoading) return <div>Đang tải dữ liệu!</div>
  if (isError) return <div>Hệ thống đang gặp sự cố!</div>

  return (
    <>
      <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-100 mb-4">
  <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
    
    {/* Logo / Tên thương hiệu */}
    <div className="text-xl font-black text-blue-800 tracking-wider flex items-center space-x-2 cursor-pointer">
      {/* Icon bánh răng giả lập cho ngành cơ khí */}
      <svg className="w-6 h-6 text-blue-600 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>CƠ KHÍ NGUYỄN MAY</span>
    </div>

    {/* Menu điều hướng */}
    <nav className="flex items-center space-x-8 text-sm font-semibold text-gray-600">
      <Link to="/" className="hover:text-blue-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-blue-600">
        Trang chủ
      </Link>
      <a href="#dich-vu" className="hover:text-blue-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-blue-600">
        Dịch vụ
      </a>
      <a href="#lien-he" className="hover:text-blue-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-blue-600">
        Liên hệ
      </a>
      <a href="#chung-toi" className="hover:text-blue-600 transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-blue-600">
        Chúng tôi
      </a>
    </nav>

  </div>
</header>
    </>
  );
}



export default Header;