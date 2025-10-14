import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";

type GenreCardProps = {
  route: string;
  imageURL: string;
  name: string;
};

export default function CategoryCard() {
  const genreCardsData: GenreCardProps[] = [
    {
      route: "/games?genre=Sport",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scb1p5.jpg",
      name: "Sport",
    },
    {
      route: "/games?genre=Strategy",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc81ff.jpg",
      name: "Strategy",
    },
    {
      route: "/games?genre=Adventure",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scagdm.jpg",
      name: "Adventure",
    },
    {
      route: "/games?genre=Indie",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scdpfd.jpg",
      name: "Indie",
    },
    {
      route: "/games?genre=Arcade",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scsmrs.jpg",
      name: "Arcade",
    },
    {
      route: "/games?genre=MOBA",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc7frs.jpg",
      name: "MOBA",
    },
    {
      route: "/games?genre=Role-playing (RPG)",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scq4s3.jpg",
      name: "Role-playing (RPG)",
    },
    {
      route: "/games?genre=Simulator",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc97qb.jpg",
      name: "Simulator",
    },
    {
      route: "/games?genre=Racing",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scahho.jpg",
      name: "Racing",
    },
    {
      route: "/games?genre=Shooter",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc7da9.jpg",
      name: "Shooter",
    },
    {
      route: "/games?genre=Platform",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scha02.jpg",
      name: "Platform",
    },
    {
      route: "/games?genre=Puzzle",
      imageURL:
        "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scaoj9.jpg",
      name: "Puzzle",
    },
  ];

  function renderGenreCards(genreCardsData: GenreCardProps[]) {
    return genreCardsData.map((cardData) => {

       const route = `/games/genres/${encodeURIComponent(cardData.name)}`;
      return (
        <SwiperSlide className="text-text-primary rounded ring-2 ring-primary ">
          <Link to={route} className="w-full h-full">
            <img
              className="object-no-repeat object-cover w-full h- opacity-15 grayscale mix-blend-luminosity"
              src={cardData.imageURL}
              alt={`${cardData.name} category`}
            />
            <span className="absolute top-1/2 left-1/2 -translate-1/2">
              {cardData.name}
            </span>
          </Link>
        </SwiperSlide>
      );
    });
  }

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
        padding: "2px",
      }}
      className="bg-bg-secondary rounded my-10 text-center"
    >
      {renderGenreCards(genreCardsData)}
    </Swiper>
  );
}
