import { useCallback, useEffect, useRef, useState } from "react";
import { FaFacebookF, FaLink, FaCheck, FaTimes } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { PiShareFatThin } from "react-icons/pi";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  canNativeShare,
  copyToClipboard,
  getFacebookShareUrl,
  getPostShareData,
  getZaloShareUrl,
  nativeShare,
} from "../../utils/share";
import { getSiteUrl } from "../../constants/site";

function SharePreviewCard({ post, companyName }) {
  const { title, description, image } = getPostShareData(post, companyName);
  const domain = getSiteUrl().replace(/^https?:\/\//, "");

  return (
    <div className="rounded-[2px] overflow-hidden border border-zinc-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="px-4 py-2.5 bg-[#f0f2f5] border-b border-zinc-200 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1877f2]" />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-zinc-500">
          Xem trước khi chia sẻ
        </span>
      </div>

      {image && (
        <div className="relative aspect-[1.91/1] bg-zinc-100 overflow-hidden">
          <img
            src={image}
            alt={post.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-4 bg-[#f0f2f5]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1.5">
          {domain || companyName}
        </p>
        <p className="text-zinc-900 font-black text-[15px] leading-snug line-clamp-2 mb-1.5">
          {title}
        </p>
        <p className="text-zinc-500 text-[13px] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}

function ShareActionButton({ icon, label, sublabel, accent, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex flex-col items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span
        className={`w-14 h-14 flex items-center justify-center text-white rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${accent}`}
      >
        {icon}
      </span>
      <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-zinc-700">
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-zinc-400 font-semibold -mt-1.5">
          {sublabel}
        </span>
      )}
    </button>
  );
}

export default function SharePost({ post, companyName, variant = "inline" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useFocusTrap(modalRef, isOpen, closeModal);

  const shareData = post ? getPostShareData(post, companyName) : null;

  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

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
    openShareWindow(getFacebookShareUrl(shareData.url));
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
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (!shareData) return;
    try {
      await nativeShare({
        title: shareData.title,
        text: shareData.description,
        url: shareData.url,
      });
      closeModal();
    } catch {
      /* user cancelled */
    }
  };

  if (!post) return null;

  const triggerClass =
    variant === "sidebar"
      ? "w-full flex items-center justify-between bg-white/10 hover:bg-white text-white hover:text-[#111111] border border-white/20 px-5 py-3.5 font-extrabold text-[12px] uppercase tracking-widest transition-all duration-300 group"
      : "flex items-center gap-2 text-zinc-400 hover:text-[#ff5a00] transition-colors duration-200 text-[13px] font-semibold";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Chia sẻ bài viết"
        aria-haspopup="dialog"
        className={triggerClass}
      >
        {variant === "sidebar" ? (
          <>
            <span className="flex items-center gap-2.5">
              <PiShareFatThin className="text-[16px]" aria-hidden="true" />
              Chia sẻ công trình
            </span>
            <span className="text-[10px] opacity-70 group-hover:opacity-100">→</span>
          </>
        ) : (
          <>
            <PiShareFatThin className="text-[18px]" aria-hidden="true" />
            <span>Chia sẻ</span>
          </>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="presentation"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" aria-hidden="true" />

          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-post-title"
            className="relative z-10 w-full sm:max-w-[440px] bg-[#f7f7f5] rounded-t-[4px] sm:rounded-[2px] shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden animate-[shareSlideUp_0.35s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#111111] px-6 py-5 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50px)",
                }}
              />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-[5px] mb-3">
                    <div className="h-[2px] w-[24px] bg-[#ff5a00]" />
                    <div className="h-[2px] w-[6px] bg-[#ff5a00]" />
                  </div>
                  <h2
                    id="share-post-title"
                    className="text-white font-black text-[18px] uppercase tracking-wide leading-tight"
                  >
                    Chia sẻ công trình
                  </h2>
                  <p className="text-zinc-400 text-[12px] mt-1.5 leading-relaxed max-w-[280px]">
                    Giới thiệu dự án đến khách hàng qua Facebook, Zalo hoặc sao chép link.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Đóng"
                  className="shrink-0 w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>

            <div className="px-5 sm:px-6 py-5 space-y-5">
              <SharePreviewCard post={post} companyName={companyName} />

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <ShareActionButton
                  icon={<FaFacebookF className="text-xl" />}
                  label="Facebook"
                  sublabel="Đăng lên tường"
                  accent="bg-[#1877f2] hover:bg-[#166fe0]"
                  onClick={handleFacebook}
                />
                <ShareActionButton
                  icon={<SiZalo className="text-2xl" />}
                  label="Zalo"
                  sublabel="Gửi bạn bè"
                  accent="bg-[#0068ff] hover:bg-[#0058d9]"
                  onClick={handleZalo}
                />
                <ShareActionButton
                  icon={
                    copied ? (
                      <FaCheck className="text-lg" />
                    ) : (
                      <FaLink className="text-lg" />
                    )
                  }
                  label={copied ? "Đã copy" : "Sao chép"}
                  sublabel="Link trực tiếp"
                  accent={
                    copied
                      ? "bg-emerald-500"
                      : "bg-[#ff5a00] hover:bg-[#e04e00]"
                  }
                  onClick={handleCopy}
                />
              </div>

              {canNativeShare() && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] hover:bg-black text-white py-3.5 font-extrabold text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
                >
                  <PiShareFatThin className="text-[15px]" />
                  Chia sẻ qua ứng dụng khác
                </button>
              )}

              <p className="text-center text-[10px] text-zinc-400 font-semibold uppercase tracking-[0.15em] pb-1">
                Ai cũng có thể chia sẻ — giúp khách hàng thấy công trình thực tế
              </p>
            </div>
          </div>

          <style>{`
            @keyframes shareSlideUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
