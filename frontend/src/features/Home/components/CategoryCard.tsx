import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";

export default function CategoryCard() {
  return (
    <Swiper
      freeMode={true}
      loop={true}
      spaceBetween={15}
      slidesPerView={5}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },

        480: {
          slidesPerView: 3,
        },

        640: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 5,
        },
      }}
      style={{ 
        padding: '2px',
      }} 
      className="bg-bg-secondary rounded my-10 text-center"
    >
      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Sport"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scb1p5.jpg"
            alt="Sport category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Sport
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Strategy"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc81ff.jpg"
            alt="Strategy category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Strategy
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Adventure"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scagdm.jpg"
            alt="Adventure category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Adventure
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Indie"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdpfd.jpg"
            alt="Indie category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Indie
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Arcade"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scsmrs.jpg"
            alt="Arcade category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Arcade
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=MOBA"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc7frs.jpg"
            alt="MOBA category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">MOBA</span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Role-playing (RPG)"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scq4s3.jpg"
            alt="Role-playing (RPG) category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Role-playing (RPG)
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Simulator"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc97qb.jpg"
            alt="Simulator category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Simulator
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Racing"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scahho.jpg"
            alt="Racing category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Racing
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Shooter"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc7da9.jpg"
            alt="Shooter category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Shooter
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/games?genre=Platform"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scha02.jpg"
            alt="Platform category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Platform
          </span>
        </Link>
      </SwiperSlide>

      <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
        <Link to={"/"} className="w-full h-full">
          <img
            className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
            src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/scaoj9.jpg"
            alt="Puzzle category"
          />
          <span className="absolute top-1/2 left-1/2 -translate-1/2">
            Puzzle
          </span>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
