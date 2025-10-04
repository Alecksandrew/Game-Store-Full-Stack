import React, { useContext, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { GameDetailsDataContext } from "../contexts/GameDetailsDataContext";
import { useMediaQuery } from "@/global/hooks/useMediaQuery";

export default function GameMediaGallery({className}: {className?:string}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const isAboveTablet = useMediaQuery('(min-width: 768px)');
  const isAboveDesktop = useMediaQuery('(min-width: 1024px)');
  
  const {gameDetails} = useContext(GameDetailsDataContext);
  const screenshotsUrls = gameDetails.screenshotsImageUrl;
 
  if (!screenshotsUrls || screenshotsUrls.length === 0) {
    return <div className="text-text-primary">No media available.</div>;
  }

  

  return (
    <div className={`w-full ${className}`}>
      {/* MAIN IMAGE */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#FFFFFF",
            "--swiper-pagination-color": "#FFFFFF",
          } as React.CSSProperties
        }
        loop={false}
        spaceBetween={0}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiperMain rounded-lg mb-4"
        style={{padding: "3px"}}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {screenshotsUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover ring-3 ring-primary bg-gray"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SECONDARY IMAGES */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={isAboveDesktop ? 5 : isAboveTablet ? 4 : 3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumbs"
        style={{padding: "4px"}}
       
      >
        {screenshotsUrls.map((url, index) => (
          <SwiperSlide
            key={index}
            className="group cursor-pointer rounded-md overflow-hidden bg-text-primary relative transition-all duration-300 ring-3 ring-text-primary
             [&.swiper-slide-thumb-active]:ring-3
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
