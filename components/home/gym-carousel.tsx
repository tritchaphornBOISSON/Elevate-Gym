"use client";

import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  TransitionEvent as ReactTransitionEvent,
} from "react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
import { EditorialImage } from "@/components/ui/editorial-image";
import type { GymSlide } from "@/content/site";

import {
  completeTransition,
  createCarouselState,
  getResponsiveSlidePosition,
  getVisualActiveIndex,
  requestNavigation,
  settleTransitions,
  type DesktopSlidePosition,
  type MobileSlidePosition,
  type NavigationDirection,
} from "./gym-carousel-model";

export type GymCarouselProps = {
  slides: readonly GymSlide[];
};

type SwipeStart = {
  pointerId: number;
  x: number;
  y: number;
};

const SWIPE_THRESHOLD_PX = 48;

const mobilePositionClasses: Record<MobileSlidePosition, string> = {
  "far-before": "-translate-x-[278%] scale-[0.6] opacity-0",
  before: "-translate-x-[202%] scale-[0.6] opacity-0",
  previous: "-translate-x-[132%] scale-[0.6] opacity-70",
  active: "-translate-x-1/2 scale-100 opacity-100",
  next: "translate-x-[32%] scale-[0.6] opacity-70",
  after: "translate-x-[102%] scale-[0.6] opacity-0",
  "far-after": "translate-x-[178%] scale-[0.6] opacity-0",
};

const desktopPositionClasses: Record<DesktopSlidePosition, string> = {
  "far-before":
    "lg:-translate-x-[250%] lg:scale-[0.6] lg:opacity-0",
  before: "lg:-translate-x-[195%] lg:scale-[0.6] lg:opacity-0",
  previous:
    "lg:-translate-x-[132.25%] lg:scale-[0.6] lg:opacity-70",
  active: "lg:-translate-x-1/2 lg:scale-100 lg:opacity-100",
  next:
    "lg:translate-x-[32.25%] lg:scale-[0.6] lg:opacity-70",
  after: "lg:translate-x-[110%] lg:scale-[0.6] lg:opacity-0",
  "far-after": "lg:translate-x-[180%] lg:scale-[0.6] lg:opacity-0",
};

export function GymCarousel({ slides }: GymCarouselProps) {
  const [carouselState, setCarouselState] = useState(() =>
    createCarouselState(0, slides.length),
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const swipeStartRef = useRef<SwipeStart | null>(null);

  if (slides.length < 3) {
    throw new Error("GymCarousel requires at least three slides.");
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);

      if (mediaQuery.matches) {
        setCarouselState((state) => settleTransitions(state, slides.length));
      }
    };

    mediaQuery.addEventListener("change", handleMotionPreference);
    return () =>
      mediaQuery.removeEventListener("change", handleMotionPreference);
  }, [slides.length]);

  const navigate = (direction: NavigationDirection) => {
    setCarouselState((state) =>
      requestNavigation(
        state,
        direction,
        slides.length,
        prefersReducedMotion,
      ),
    );
  };

  const previous = () => navigate(-1);
  const next = () => navigate(1);

  const handleTransitionEnd = (
    event: ReactTransitionEvent<HTMLDivElement>,
    slideIndex: number,
  ) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "translate"
    ) {
      return;
    }

    setCarouselState((state) => {
      if (
        state.direction === null ||
        getVisualActiveIndex(state, slides.length) !== slideIndex
      ) {
        return state;
      }

      return completeTransition(state, slides.length);
    });
  };

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

  const activeIndex = carouselState.activeIndex;
  const visualActiveIndex = getVisualActiveIndex(
    carouselState,
    slides.length,
  );

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
        <div className="relative aspect-[1.353] w-full lg:aspect-[1.65]">
          {slides.map((slide, slideIndex) => {
            const position = getResponsiveSlidePosition(
              slideIndex,
              visualActiveIndex,
              slides.length,
            );
            const isVisualActive = slideIndex === visualActiveIndex;
            const isCommittedActive = slideIndex === activeIndex;

            return (
              <div
                aria-hidden={!isCommittedActive}
                className={`pointer-events-none absolute top-1/2 left-1/2 z-10 aspect-[3/4] w-[55.45%] -translate-y-1/2 transition-[translate,scale,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:w-[44.55%] ${mobilePositionClasses[position.mobile]} ${desktopPositionClasses[position.desktop]} ${
                  carouselState.direction === null
                    ? ""
                    : "will-change-[translate,scale,opacity]"
                }`}
                key={slide.id}
                onTransitionEnd={(event) =>
                  handleTransitionEnd(event, slideIndex)
                }
              >
                <EditorialImage
                  alt={slide.alt}
                  className={`h-full w-full rounded-md border ${
                    isVisualActive ? "border-white/30" : "border-white/15"
                  }`}
                  objectPosition={slide.objectPosition}
                  sizes={
                    isVisualActive
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
