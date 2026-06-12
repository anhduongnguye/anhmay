import React, { useState } from 'react';
// Nếu muốn có hiệu ứng phóng to ảnh xịn sò, bạn có thể cài thêm thư viện nhỏ này:
// npm install yet-another-react-lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function FacebookImageGrid({ post }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = post.images;
  const totalImages = images.length;

  // Hàm xử lý khi click vào ảnh để xem
  const handleOpenLightbox = (imgIndex) => {
    setIndex(imgIndex);
    setOpen(true);
  };

  if (totalImages === 0) return null;

  return (
    <div className="w-full">
      {/* Khung cố định chiều cao 260px — mọi thẻ post đều cùng kích thước ảnh */}
      <div
        className="relative overflow-hidden bg-gray-100"
        style={{ height: "260px" }}
      >
        <div
          className={`absolute inset-0 grid gap-[2px] ${totalImages === 1 ? "grid-cols-1" : "grid-cols-2"
            } ${totalImages === 3
              ? "grid-rows-2"
              : totalImages >= 4
                ? "grid-rows-2"
                : "grid-rows-1"
            }`}
        >
          {images.slice(0, 4).map((image, imgIndex) => {
            const isLastVisible = imgIndex === 3;
            const hasMore = totalImages > 4;

            // Ảnh đầu khi chỉ có 3 ảnh → chiếm cả cột trái (2 hàng)
            const spanClass =
              totalImages === 3 && imgIndex === 0 ? "row-span-2" : "";

            return (
              <div
                key={imgIndex}
                className={`relative cursor-pointer overflow-hidden bg-gray-200 ${spanClass}`}
                onClick={() => handleOpenLightbox(imgIndex)}
              >
                <img
                  src={image}
                  alt={`post-img-${imgIndex}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {isLastVisible && hasMore && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white font-bold text-2xl">
                    +{totalImages - 3}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img }))}
      />
    </div>
  );
}