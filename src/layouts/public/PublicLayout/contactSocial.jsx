import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaRegClock,
  FaArrowRight,
  FaHeadset,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const normalizePhone = (phone = "") => phone.replace(/\s/g, "");

export default function ContactSocial() {
  const company = useSelector((state) => state.company.company);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const phoneRaw = normalizePhone(company?.phone);
  const contactChannels = [
    {
      id: "phone",
      label: "Gọi hotline ngay",
      value: company?.phone,
      href: phoneRaw ? `tel:${phoneRaw}` : undefined,
      icon: <FaPhoneAlt className="text-lg" />,
      accent: "bg-[#ff5a00]",
      description: "Tư vấn trực tiếp, báo giá nhanh trong 5 phút",
      cta: "Gọi ngay",
      external: false,
    },
    {
      id: "zalo",
      label: "Chat Zalo",
      value: company?.phone,
      href: company?.zalo,
      icon: <SiZalo className="text-xl" />,
      accent: "bg-[#0068ff]",
      description: "Nhắn tin tiện lợi, gửi hình ảnh công trình dễ dàng",
      cta: "Mở Zalo",
      external: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      value: "Fanpage chính thức",
      href: company?.facebook,
      icon: <FaFacebookF className="text-lg" />,
      accent: "bg-[#1877f2]",
      description: "Theo dõi dự án mới và ưu đãi độc quyền",
      cta: "Kết nối",
      external: true,
    },
    {
      id: "email",
      label: "Email",
      value: company?.email,
      href: company?.email ? `mailto:${company.email}` : undefined,
      icon: <FaEnvelope className="text-lg" />,
      accent: "bg-zinc-900",
      description: "Gửi yêu cầu báo giá chi tiết, hồ sơ năng lực",
      cta: "Gửi email",
      external: false,
    },
  ];

  return (
    <section
      id="lien-he"
      ref={containerRef}
      aria-label="Thông tin liên hệ"
      className="w-full pt-16 pb-24 bg-transparent font-['Titillium_Web',sans-serif] overflow-hidden scroll-mt-[70px] lg:scroll-mt-[120px]"
    >
      <div className="container mx-auto px-[20px] max-w-[1320px]">
        {/* Section heading */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="text-[#ff5a00] uppercase tracking-[0.3em] text-[11px] font-extrabold mb-3 block">
            Kết nối với chúng tôi
          </span>
          <h2 className="text-2xl md:text-[36px] text-zinc-950 font-black uppercase tracking-tight leading-tight">
            Liên hệ tư vấn & báo giá
          </h2>
          <div className="flex items-center justify-center gap-[5px] mt-[12px] mb-[20px]">
            <div className="h-[2px] w-[35px] bg-[#ff5a00]" />
            <div className="h-[2px] w-[8px] bg-[#ff5a00]" />
            <div className="h-[2px] w-[8px] bg-[#ff5a00]" />
          </div>
          <p className="text-zinc-500 text-[15px] font-light leading-relaxed max-w-2xl mx-auto">
            Đội ngũ {company?.name || "Cơ khí Nguyễn May"} sẵn sàng hỗ trợ 24/7 qua mọi kênh.
            Chọn cách liên hệ thuận tiện nhất — phản hồi nhanh, tư vấn chuyên sâu, báo giá minh bạch.
          </p>
        </div>

        {/* Main card */}
        <div
          className={`relative z-20 bg-white rounded-[4px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-[1200ms] transform ${
            isVisible ? "translate-y-0 opacity-100 delay-150" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex flex-col xl:flex-row min-h-[520px]">
            {/* Left: Brand & info panel */}
            <div className="w-full xl:w-[38%] bg-[#111111] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#ff5a00]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-10 bottom-0 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  {company?.logo && (
                    <div className="shrink-0 bg-white/5 border border-white/10 p-3 rounded-sm">
                      <img
                        src={company.logo}
                        alt={company?.name || "Logo công ty"}
                        className="w-[72px] h-[72px] object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#ff5a00] font-extrabold mb-1">
                      Doanh nghiệp uy tín
                    </p>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-snug">
                      {company?.name || "Cơ khí Nguyễn May"}
                    </h3>
                  </div>
                </div>

                {company?.thumbnail && (
                  <div className="overflow-hidden rounded-sm border border-white/10 group/thumb">
                    <img
                      src={company.thumbnail}
                      alt={`${company?.name || "Công ty"} - hình đại diện`}
                      className="w-full h-[160px] object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                    />
                  </div>
                )}

                <div>
                  <h4 className="text-[12px] uppercase tracking-[0.25em] font-extrabold text-white/60 mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[11px] text-[#ff5a00]" />
                    Trụ sở & xưởng sản xuất
                  </h4>
                  <p className="text-[16px] font-bold leading-relaxed text-zinc-100">
                    {company?.address || "TDP Phe Tu, Phong Thai, Thanh Pho Hue"}
                  </p>
                </div>

                <div className="flex items-start gap-3 text-[14px] text-zinc-300 leading-relaxed">
                  <FaRegClock className="text-[#ff5a00] mt-1 shrink-0" />
                  <span>
                    Phản hồi trong <span className="text-white font-bold">24 giờ làm việc</span>.
                    Hotline hoạt động hàng ngày{" "}
                    <span className="text-white font-black underline decoration-[#ff5a00]/50">
                      07:30 – 21:00
                    </span>
                  </span>
                </div>
              </div>

              {/* Primary CTA strip */}
              <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4 group/phone">
                  <div className="w-14 h-14 rounded-sm bg-[#ff5a00] flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(255,90,0,0.35)] group-hover/phone:scale-105 transition-transform duration-300">
                    <FaHeadset className="text-xl text-white" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">
                      Hotline tư vấn miễn phí
                    </span>
                    {phoneRaw ? (
                      <a
                        href={`tel:${phoneRaw}`}
                        className="text-2xl md:text-[28px] font-black tracking-tight text-white hover:text-[#ff5a00] transition-colors truncate"
                      >
                        {company.phone}
                      </a>
                    ) : (
                      <span className="text-2xl font-black text-white/80">0789 410 451</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact channels grid */}
            <div className="w-full xl:w-[62%] p-8 md:p-10 lg:p-12 bg-zinc-50/80">
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 uppercase tracking-tight">
                  Chọn kênh liên hệ
                </h3>
                <p className="text-zinc-500 text-[14px] mt-2 font-medium">
                  Một cú chạm — kết nối ngay với chuyên gia tư vấn của chúng tôi
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {contactChannels.map((channel, index) => {
                  const Wrapper = channel.href ? "a" : "div";
                  const linkProps = channel.href
                    ? {
                        href: channel.href,
                        ...(channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {}),
                      }
                    : {};

                  return (
                    <Wrapper
                      key={channel.id}
                      {...linkProps}
                      className={`group relative flex flex-col justify-between min-h-[168px] p-6 bg-white border border-zinc-100 rounded-[4px] shadow-sm transition-all duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-[#ff5a00]/30 ${
                        channel.href ? "cursor-pointer" : "opacity-60 cursor-not-allowed"
                      } ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms" }}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className={`w-11 h-11 rounded-sm ${channel.accent} text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                          >
                            {channel.icon}
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.15em] font-extrabold text-zinc-400 group-hover:text-[#ff5a00] transition-colors">
                            {channel.label}
                          </span>
                        </div>
                        <p className="text-[17px] font-black text-zinc-900 leading-snug break-all">
                          {channel.value || "—"}
                        </p>
                        <p className="text-[13px] text-zinc-500 mt-2 leading-relaxed font-medium">
                          {channel.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#ff5a00] group-hover:gap-3 transition-all duration-300">
                        {channel.cta}
                        <FaArrowRight className="text-[10px]" />
                      </div>

                      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ff5a00] group-hover:w-full transition-all duration-500 rounded-b-[4px]" />
                    </Wrapper>
                  );
                })}
              </div>

              {/* Bottom trust bar */}
              <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-bold uppercase tracking-wider text-zinc-500">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Đang trực tuyến
                  </span>
                  <span>12+ năm kinh nghiệm</span>
                  <span>Báo giá minh bạch</span>
                </div>
                {company?.zalo && (
                  <a
                    href={company.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 pl-6 pr-2 h-[48px] bg-zinc-900 hover:bg-[#ff5a00] text-white font-extrabold text-[12px] uppercase tracking-[0.12em] rounded-[2px] transition-colors duration-300 shadow-md group"
                  >
                    <span>Nhận tư vấn ngay</span>
                    <span className="w-[34px] h-[34px] bg-white/10 rounded-[1px] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <FaArrowRight className="text-[11px]" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
