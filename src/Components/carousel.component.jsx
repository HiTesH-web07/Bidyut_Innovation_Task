import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Carousel({ children: slides, autoslide = false, autoslideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoslide) return;
    const slideInterval = setInterval(next, autoslideInterval);
    return () => clearInterval(slideInterval);
  }, [curr, autoslide, autoslideInterval]);

  return (
    <div className="relative overflow-hidden w-full rounded-2xl">
      <div
        className="flex w-full transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>

     

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${curr === i ? "bg-white p-1" : "bg-white bg-opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
}
