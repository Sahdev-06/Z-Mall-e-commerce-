import { useCallback, useEffect, useRef, useState } from "react";



export default function HeroBanner({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const timerRef = useRef(null);

  const clearSlideTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto slide
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) {
      return;
    }

    clearSlideTimer();

    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, 2500);

    return clearSlideTimer;
  }, [
    currentSlide,
    isPlaying,
    goToNextSlide,
    clearSlideTimer,
  ]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearSlideTimer();
    };
  }, [clearSlideTimer]);

  const handleSlideClick = (slide) => {
    // Stop autoplay
    setIsPlaying(false);
    clearSlideTimer();

    // Apna redirect/action yahan connect karo
    // console.log("Clicked:", slide);

    // Example:
    // window.location.href = "/products";
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      {/* Slider */}
      <div
        className="flex will-change-transform"
        style={{
          transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
          transition: "transform 700ms ease-in-out",
        }}
      >
        {slides.map((slide) => (
          <button
            key={slide._id}
            type="button"
            onClick={() => handleSlideClick(slide)}
            className="min-w-full shrink-0 cursor-pointer border-0 bg-transparent p-0"
          >
            <div
              className="
                h-[180px]
                w-full
                overflow-hidden
                sm:h-[220px]
                md:h-[280px]
                lg:h-[350px]
                xl:h-[400px]
              "
            >
              <img
                src={slide.image}
                alt={slide.title}
                draggable="false"
                className="
                  h-full
                  w-full
                  select-none
                  object-fit
                  object-center
                "
              />
            </div>
          </button>
        ))}
      </div>

      {/* Dots */}
      <div
        className="
          absolute
          bottom-3
          left-1/2
          flex
          -translate-x-1/2
          gap-1.5
          sm:bottom-4
          sm:gap-2
        "
      >
        {slides.map((slide, index) => (
          <button
            key={slide._id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={(event) => {
              event.stopPropagation();

              clearSlideTimer();
              setCurrentSlide(index);
              setIsPlaying(false);
            }}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300
              sm:h-2

              ${
                currentSlide === index
                  ? "w-6 bg-white sm:w-8"
                  : "w-1.5 bg-white/60 sm:w-2"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}