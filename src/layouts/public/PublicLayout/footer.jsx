function Footer() {
  return (
    <>
      <div className="w-full mt-12 bg-gray-950 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          {/* Grid chia 3 cột trên màn hình lớn */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            {/* Cột 1: Giới thiệu ngắn */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white tracking-wider uppercase">Cơ khí Nguyễn May</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Xây dựng các trải nghiệm kỹ thuật số sáng tạo, tối ưu hiệu năng và mang lại giá trị thực cho người dùng.
              </p>
            </div>

            {/* Cột 2: Đường dẫn nhanh */}
            <div>
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Khám phá</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Trang chủ</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Dự án công nghệ</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition-colors duration-200">Bài viết chia sẻ</a>
                </li>
              </ul>
            </div>

            {/* Cột 3: Liên hệ & Mạng xã hội */}
            <div>
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">Kết nối</h3>
              <p className="text-sm text-gray-400 mb-4">Email: cokhinguyenmay@contact.com</p>
              <div className="flex space-x-3">
                {/* Các nút mạng xã hội giả */}
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold">
                  FB
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold">
                  GH
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold">
                  LN
                </a>
              </div>
            </div>

          </div>

          {/* Đường gạch ngang phân cách */}
          <hr className="my-8 border-gray-800" />

          {/* Phần Copyright phía dưới */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-2 sm:space-y-0">
            <p>&copy; {new Date().getFullYear()} Cơ khí Nguyễn May Studio. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Điều khoản dịch vụ</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Footer;