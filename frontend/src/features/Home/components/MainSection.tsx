import Button from "@/global/components/Button";

export default function MainSection() {
  return (
    <section className="relative bg-[url(https://images.igdb.com/igdb/image/upload/t_1080p/scd720.jpg)] bg-no-repeat h-[60dvh] bg-cover flex flex-col justify-center p-8 rounded outline-2 outline-primary mb-10 overflow-hidden">
      <div className="w-45/100">
        <div className="relative z-10 ">
          <h1 className="text-6xl text-primary">
            Discover your next adventure
          </h1>
          <p className="font-inter text-2xl text-text-primary">
            Explore thousands of digital games with instant delivery. Best
            prices, authentic keys, and 24/7 support.
          </p>
        </div>
        <div className="w-4/10 mt-6">
          <Button
            type="button"
            title="Explore catalog"
            className="relative bg-primary z-10"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 bg-gradient-to-r from-bg-primary to-transparent w-full h-full"></div>
    </section>
  );
}
