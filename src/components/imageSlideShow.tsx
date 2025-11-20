import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTransition, animated, easings, useSpring } from "@react-spring/web";
export type Slide = {
  id?: string | number;
  title?: string;
  caption?: string;
  image?: string; // URL
  content?: React.ReactNode; // custom JSX per slide
  bg?: string; // fallback background color (Tailwind or CSS color)
};

export type SlideshowProps = {
  slides: Slide[];
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  interval?: number; // ms
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  showProgress?: boolean;
  className?: string;
  initialIndex?: number;
};

function clampIndex(idx: number, len: number) {
  if (len === 0) return 0;
  return ((idx % len) + len) % len;
}

export const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  width = window.innerWidth < 720 ? "100%" : window.innerWidth / 2 - 48,
  height = window.innerWidth < 720
    ? 470
    : window.innerWidth < 1100
      ? window.innerHeight / 2 - 160
      : window.innerHeight - 160,
  autoplay = true,
  interval = 10000,
  loop = true,
  showDots = true,
  showArrows = true,
  showProgress = true,
  className = "",
  initialIndex = 0,
}) => {
  const [index, setIndex] = useState(clampIndex(initialIndex, slides.length));
  const [isPaused, setPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const safeSlides = slides ?? [];
  const length = safeSlides.length;

  const goTo = useCallback(
    (next: number, dir: "next" | "prev" = "next") => {
      setDirection(dir);
      setIndex(clampIndex(next, length));
    },
    [length]
  );
  const next = useCallback(() => goTo(index + 1, "next"), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1, "prev"), [index, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        containerRef.current?.contains(document.activeElement)
      ) {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Autoplay with pause on hover/focus
  useEffect(() => {
    if (!autoplay || isPaused || length <= 1) return;
    const id = setInterval(
      () => {
        if (!loop && index >= length - 1) return;
        goTo(index + 1, "next");
      },
      Math.max(1200, interval)
    );
    return () => clearInterval(id);
  }, [autoplay, interval, isPaused, loop, length, index, goTo]);

  const transitions = useTransition(index, {
    key: index,
    from:
      direction === "next"
        ? { opacity: 0, transform: "translate3d(100%,0,0)" }
        : { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave:
      direction === "next"
        ? { opacity: 0, transform: "translate3d(-100%,0,0)" }
        : { opacity: 0, transform: "translate3d(100%,0,0)" },
    config: { tension: 250, friction: 30, easing: easings.easeInOutCubic },
  });

  // Progress bar spring
  const progressApiRef = useRef<any>(null);
  const [progressStyles, progressApi] = useSpring(() => ({ width: "100%" }));
  progressApiRef.current = progressApi;

  // Restart progress on index change
  useEffect(() => {
    if (!showProgress || !autoplay) return;
    progressApiRef.current?.stop(true).set({ width: "0%" });
    progressApiRef.current?.start({
      width: "100%",
      config: { duration: interval },
    });
  }, [index, interval, autoplay, showProgress]);

  const currentSlide = useMemo(
    () => safeSlides[clampIndex(index, length)],
    [index, length, safeSlides]
  );

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl shadow-lg ${className}`}
      style={{ width, height }}
      tabIndex={0}
      onMouseEnter={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(false)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Slideshow"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {transitions((style) => (
          <animated.div
            className="absolute inset-0 will-change-transform will-change-opacity"
            style={style}
          >
            <SlideView slide={currentSlide} />
          </animated.div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="group rounded-full bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <svg
              className="h-5 w-5 md:h-6 md:w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="group rounded-full bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <svg
              className="h-5 w-5 md:h-6 md:w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Dots */}
      {showDots && length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2 bg-black/30 rounded-full px-3 py-1.5 backdrop-blur">
          {safeSlides.map((s, i) => (
            <button
              key={s.id ?? i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > index ? "next" : "prev")}
              className={`h-2.5 w-2.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "bg-white/60 hover:bg-white/80"}`}
            />
          ))}
        </div>
      )}

      {/* Progress */}
      {showProgress && autoplay && length > 1 && (
        <div className="absolute left-0 right-0 top-0 h-1 bg-black/10">
          <animated.div className="h-full bg-white/80" style={progressStyles} />
        </div>
      )}
    </div>
  );
};

const SlideView: React.FC<{ slide?: Slide }> = ({ slide }) => {
  if (!slide) return null;
  const hasImage = Boolean(slide.image);
  return (
    <div
      className={`h-full w-full relative ${!hasImage ? "flex items-center justify-center" : ""}`}
      style={{ background: slide.bg ?? (hasImage ? undefined : "#111827") }}
    >
      {hasImage ? (
        <img
          src={slide.image}
          alt={slide.title ?? "Slide image"}
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      ) : null}
      {slide.content ? (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-3xl text-center text-white">
            {slide.content}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default function SlideshowDemo({ photoBoothUrls }: any) {
  return (
    <div className="px-6">
      <p className="text-2xl font-bold mb-4 text-center">កម្រងអនុស្សាវរីយ៍</p>
      <Slideshow
        slides={photoBoothUrls}
        autoplay
        interval={10000}
        loop
        className="max-w-5xl mx-auto"
      />
    </div>
  );
}
