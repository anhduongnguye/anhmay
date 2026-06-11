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
    <div className="w-full max-w-xl my-4">
      {/* Định hình khung lưới dựa trên số lượng ảnh:
        - 1 ảnh: Hiện full rộng
        - 2 ảnh: Chia đôi 2 cột (grid-cols-2)
        - 3 hoặc nhiều hơn: Chia làm 2 cột ghép cặp
      */}
      <div className={`grid gap-1.5 overflow-hidden rounded-xl ${
        totalImages === 1 ? 'grid-cols-1' : 'grid-cols-2'
      }`}>
        
        {images.slice(0, 4).map((image, imgIndex) => {
          // Kiểm tra xem đây có phải là bức ảnh cuối cùng hiển thị (ảnh thứ 4) không
          const isLastVisible = imgIndex === 3;
          // Kiểm tra xem có còn ảnh thừa phía sau không
          const hasMore = totalImages > 4;

          return (
            <div 
              key={imgIndex} 
              className={`relative cursor-pointer overflow-hidden bg-gray-100 aspect-square ${
                // Nếu chỉ có 3 ảnh, cho ảnh đầu tiên chiếm trọn dòng đầu
                totalImages === 3 && imgIndex === 0 ? 'col-span-2 aspect-[2/1]' : ''
              }`}
              onClick={() => handleOpenLightbox(imgIndex)}
            >
              <img 
                src={image} 
                alt={`post-img-${imgIndex}`} 
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-200" 
              />

              {/* Lớp phủ dấu cộng cho bức ảnh cuối cùng */}
              {isLastVisible && hasMore && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-2xl">
                  +{totalImages - 3}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bộ thư viện Lightbox để bấm vào là xem, vuốt qua vuốt lại như Facebook */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map(img => ({ src: img }))}
      />
    </div>
  );
}