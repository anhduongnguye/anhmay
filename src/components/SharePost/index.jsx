import { useState } from "react";
import { FaFacebookF, FaLink, FaCheck } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { PiShareFatThin } from "react-icons/pi";
import {
  copyToClipboard,
  getFacebookShareUrl,
  getPostShareData,
  getZaloShareUrl,
} from "../../utils/share";

export default function SharePost({ post, companyName, variant = "inline" }) {
  const [copied, setCopied] = useState(false);
  const shareData = post ? getPostShareData(post, companyName) : null;

  const openShareWindow = (url) => {
    // Kiểm tra xem người dùng có đang dùng điện thoại/máy tính bảng không
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Trên điện thoại: Mở tab mới hoàn toàn (Trình duyệt mobile sẽ KHÔNG chặn)
      window.open(url, "_blank");
    } else {
      // Trên máy tính: Giữ nguyên cửa sổ Pop-up nhỏ gọn như cũ
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=520");
    }
  };

  const handleFacebook = () => {
    if (!shareData) return;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    openShareWindow(getFacebookShareUrl(shareData.url, shareData.title, isMobile));
  };

  const handleZalo = () => {
    if (!shareData) return;
    openShareWindow(getZaloShareUrl(shareData.url));
  };

  const handleCopy = async () => {
    if (!shareData) return;
    const success = await copyToClipboard(shareData.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) return null;

  if (variant === "sidebar") {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleFacebook}
          className="flex items-center justify-center gap-3 bg-[#1877f2] hover:bg-[#166fe0] text-white px-4 py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300 w-full"
        >
          <FaFacebookF className="text-[16px]" />
          <span className="hidden sm:inline">Chia sẻ Facebook</span>
          <span className="sm:hidden">Facebook</span>
        </button>
        <button
          type="button"
          onClick={handleZalo}
          className="flex items-center justify-center gap-3 bg-[#0068ff] hover:bg-[#0058d9] text-white px-4 py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300 w-full"
        >
          <SiZalo className="text-[18px]" />
          <span className="hidden sm:inline">Chia sẻ Zalo</span>
          <span className="sm:hidden">Zalo</span>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-3 bg-[#ff5a00] hover:bg-[#e04e00] text-white px-4 py-3 font-extrabold text-[12px] uppercase tracking-widest transition-colors duration-300 w-full"
        >
          {copied ? <FaCheck className="text-[14px]" /> : <FaLink className="text-[14px]" />}
          <span className="hidden sm:inline">{copied ? "Đã copy link" : "Copy link"}</span>
          <span className="sm:hidden">{copied ? "Đã copy" : "Copy"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={handleFacebook}
        aria-label="Chia sẻ lên Facebook"
        className="flex items-center gap-2 text-zinc-400 hover:text-[#1877f2] transition-colors duration-200 text-[13px] font-semibold"
      >
        <FaFacebookF className="text-[16px]" />
        <span className="hidden sm:inline">Facebook</span>
      </button>
      <div className="w-px h-4 bg-zinc-200" />
      <button
        type="button"
        onClick={handleZalo}
        aria-label="Chia sẻ lên Zalo"
        className="flex items-center gap-2 text-zinc-400 hover:text-[#0068ff] transition-colors duration-200 text-[13px] font-semibold"
      >
        <SiZalo className="text-[18px]" />
        <span className="hidden sm:inline">Zalo</span>
      </button>
      <div className="w-px h-4 bg-zinc-200" />
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Đã sao chép" : "Sao chép link"}
        className="flex items-center gap-2 text-zinc-400 hover:text-[#ff5a00] transition-colors duration-200 text-[13px] font-semibold"
      >
        {copied ? <FaCheck className="text-[14px]" /> : <FaLink className="text-[14px]" />}
        <span className="hidden sm:inline">{copied ? "Đã copy" : "Copy"}</span>
      </button>
    </div>
  );
}
