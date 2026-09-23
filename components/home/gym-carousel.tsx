"use client";

import { useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import { EditorialImage } from "@/components/ui/editorial-image";
import type { GymSlide } from "@/content/site";

export type GymCarouselProps = {
  slides: readonly GymSlide[];
};

type SwipeStart = {
  pointerId: number;
  x: number;
  y: number;
};

type SlidePosition = "previous" | "active" | "next";

const SWIPE_THRESHOLD_PX = 48;

const wrapIndex = (index: number, length: number) =>
  (index + length) % length;

const positionClasses: Record<SlidePosition, string> = {
  previous: "order-1 lg:order-3",
  active: "order-2 lg:order-1",
  next: "order-3 lg:order-2",
};

export function GymCarousel({ slides }: GymCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartRef = useRef<SwipeStart | null>(null);

  if (slides.length < 3) {
    throw new Error("GymCarousel requires at least three slides.");
  }

  const previous = () => {
    setActiveIndex((index) => wrapIndex(index - 1, slides.length));
  };

  const next = () => {
    setActiveIndex((index) => wrapIndex(index + 1, slides.length));
  };

  const visibleSlides: readonly {
    slideIndex: number;
    position: SlidePosition;
  }[] = [
    {
      slideIndex: wrapIndex(activeIndex - 1, slides.length),
      position: "previous",
    },
    { slideIndex: activeIndex, position: "active" },
    {
      slideIndex: wrapIndex(activeIndex + 1, slides.length),
      position: "next",
    },
  ];

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (
      target.closest("button") ||
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const releasePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;

    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    swipeStartRef.current = null;
    releasePointer(event);

    const horizontalTravel = event.clientX - start.x;
    const verticalTravel = event.clientY - start.y;

    if (
      Math.abs(horizontalTravel) < SWIPE_THRESHOLD_PX ||
      Math.abs(horizontalTravel) <= Math.abs(verticalTravel)
    ) {
      return;
    }

    if (horizontalTravel < 0) {
      next();
    } else {
      previous();
    }
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStartRef.current?.pointerId !== event.pointerId) {
      return;
    }

    swipeStartRef.current = null;
    releasePointer(event);
  };

  return (
    <div
      aria-label="Gym image gallery"
      aria-roledescription="carousel"
      className="relative w-full touch-pan-y select-none px-7 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-10 lg:px-16"
      onKeyDown={handleKeyDown}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="region"
      tabIndex={0}
    >
      <div className="overflow-hidden">
        <div className="grid w-[122%] -translate-x-[9%] grid-cols-[0.6fr_1fr_0.6fr] items-center gap-2 sm:gap-3 lg:w-full lg:translate-x-0 lg:grid-cols-[1.667fr_1fr_1fr]">
          {visibleSlides.map(({ slideIndex, position }) => {
            const slide = slides[slideIndex];
            const isActive = position === "active";

            return (
              <div
                className={`aspect-[3/4] min-w-0 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${positionClasses[position]} ${
                  isActive ? "scale-100 opacity-100" : "scale-[0.98] opacity-70"
                }`}
                key={slide.id}
              >
                <EditorialImage
                  alt={slide.alt}
                  className={`h-full w-full rounded-md border ${
                    isActive ? "border-white/30" : "border-white/15"
                  }`}
                  objectPosition={slide.objectPosition}
                  sizes={
                    isActive
                      ? "(min-width: 1024px) 28vw, 56vw"
                      : "(min-width: 1024px) 17vw, 34vw"
                  }
                  src={slide.src}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        aria-label="Show previous gym image"
        className="group absolute top-1/2 left-0 inline-flex size-11 -translate-y-1/2 items-center justify-center text-accent focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        onClick={previous}
        type="button"
      >
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-charcoal motion-reduce:transition-none lg:size-11">
          <ArrowIcon className="size-3 lg:size-4" direction="left" />
        </span>
      </button>
      <button
        aria-label="Show next gym image"
        className="group absolute top-1/2 right-0 inline-flex size-11 -translate-y-1/2 items-center justify-center text-accent focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        onClick={next}
        type="button"
      >
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-charcoal motion-reduce:transition-none lg:size-11">
          <ArrowIcon className="size-3 lg:size-4" direction="right" />
        </span>
      </button>

      <p aria-atomic="true" aria-live="polite" className="sr-only">
        Gym image {activeIndex + 1} of {slides.length}
      </p>
    </div>
  );
}
