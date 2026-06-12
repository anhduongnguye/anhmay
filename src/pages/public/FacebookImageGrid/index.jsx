import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function FacebookImageGrid({ post }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = post.images;
  const totalImages = images.length;

  const handleOpenLightbox = (imgIndex) => {
    setIndex(imgIndex);
    setOpen(true);
  };

  const handleKeyDown = (e, imgIndex) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenLightbox(imgIndex);
    }
  };

  if (totalImages === 0) return null;

  return (
    <div className="w-full">
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

            const spanClass =
              totalImages === 3 && imgIndex === 0 ? "row-span-2" : "";

            const label = hasMore && isLastVisible
              ? `Xem ảnh ${imgIndex + 1}, còn thêm ${totalImages - 3} ảnh`
              : `Xem ảnh ${imgIndex + 1} trong ${totalImages}`;

            return (
              <div
                key={imgIndex}
                role="button"
                tabIndex={0}
                aria-label={label}
                className={`relative cursor-pointer overflow-hidden bg-gray-200 ${spanClass}`}
                onClick={() => handleOpenLightbox(imgIndex)}
                onKeyDown={(e) => handleKeyDown(e, imgIndex)}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {isLastVisible && hasMore && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white font-bold text-2xl" aria-hidden="true">
                    +{totalImages - 3}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img }))}
      />
    </div>
  );
}
