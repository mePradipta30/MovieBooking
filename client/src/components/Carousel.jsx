import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/assets"; // make sure banner paths are exported here

const banners = [
  assets.banner1,
  assets.banner2,
  assets.banner3,
  assets.banner4,
  assets.banner5,
  assets.banner6,
  assets.banner7,
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-[110px] md:mt-[130px]">
      {/* Slides */}
      <div
        className="flex w-[50%] transition-transform duration-700 ease-in-out px-15"
        style={{ transform: `translateX(-${current * 67}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="min-w-full">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[190px] sm:h-[250px] md:h-[340px] object-cover rounded-xl px-1"
            />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              current === i ? "bg-red-700 scale-110" : "bg-white/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;