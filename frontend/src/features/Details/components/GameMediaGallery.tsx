import React, { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { GameMediaGalleryProps } from "../types/GameMediaGalleryType";

export default function GameMediaGallery({
  screenshotUrls,
}: GameMediaGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!screenshotUrls || screenshotUrls.length === 0) {
    return <div className="text-text-primary">No media available.</div>;
  }

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#FFFFFF",
            "--swiper-pagination-color": "#FFFFFF",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={0}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperMain rounded-lg mb-4"
      >
        {screenshotUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SECONDARY IMAGES */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumbs"
        style={{padding: "4px"}}
      >
        {screenshotUrls.map((url, index) => (
          <SwiperSlide
            key={index}
            className="group cursor-pointer rounded-md overflow-hidden bg-primary relative transition-all duration-300
             [&.swiper-slide-thumb-active]:ring-4 
             [&.swiper-slide-thumb-active]:ring-primary"
          >
            {/* O 'swiper-slide-thumb-active' é uma classe que o próprio Swiper adiciona à miniatura ativa! */}
            <img
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-200
               grayscale-100 opacity-100 mix-blend-multiply brightness-85
               group-[.swiper-slide-thumb-active]:brightness-100
               group-[.swiper-slide-thumb-active]:grayscale-0
               group-[.swiper-slide-thumb-active]:opacity-100
               group-[.swiper-slide-thumb-active]:mix-blend-normal"

            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
