import { Button } from "@/global/components/Button";


export default function MainSection() {
  return (
    <section className="relative bg-[url(https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg)] sm:bg-[url(https://images.igdb.com/igdb/image/upload/t_1080p/scd720.jpg)] bg-no-repeat bg-center h-[70dvh] md:h-[60dvh] bg-cover flex flex-col justify-end md:justify-center p-8 rounded outline-2 outline-primary mb-10 overflow-hidden">
      <div className=" md:w-45/100">
        <div className="relative z-10 ">
          <h1 className="text-3xl leading-7 sm:text-5xl sm:leading-10 text-primary">
            Discover your next adventure
          </h1>
          <p className="font-inter text-md sm:text-xl leading-5 text-text-primary mt-2">
            Explore thousands of digital games with instant delivery. Best
            prices, authentic keys, and 24/7 support.
          </p>
        </div>
        <div className="min-w-[140px] w-6/10 md:w-6/10 max-w-40 mt-6">
          <Button
            type="button"
            className="relative bg-primary z-10"
          >Explore catalog</Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-primary from-30% to-transparent w-full h-full"></div>
    </section>
  );
}
