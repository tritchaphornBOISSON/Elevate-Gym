export type NavigationDirection = -1 | 1;
export type CarouselLayout = "desktop" | "mobile";

export type SlidePosition =
  | "far-before"
  | "before"
  | "previous"
  | "active"
  | "next"
  | "after"
  | "far-after";

export type MobileSlidePosition = SlidePosition;
export type DesktopSlidePosition = SlidePosition;

export type ResponsiveSlidePosition = {
  mobile: MobileSlidePosition;
  desktop: DesktopSlidePosition;
};

export type CarouselState = {
  activeIndex: number;
  direction: NavigationDirection | null;
  queue: readonly NavigationDirection[];
};

export const wrapIndex = (index: number, length: number) =>
  ((index % length) + length) % length;

const visibleOffsets: Record<
  CarouselLayout,
  readonly [-1, 0, 1]
> = {
  desktop: [-1, 0, 1],
  mobile: [-1, 0, 1],
};

export function getVisibleSlideIndices(
  activeIndex: number,
  length: number,
  layout: CarouselLayout,
): [number, number, number] {
  const [previousOffset, activeOffset, nextOffset] = visibleOffsets[layout];

  return [previousOffset, activeOffset, nextOffset].map((offset) =>
    wrapIndex(activeIndex + offset, length),
  ) as [number, number, number];
}

function getMobilePosition(
  slideIndex: number,
  activeIndex: number,
  length: number,
): MobileSlidePosition {
  const forwardDistance = wrapIndex(slideIndex - activeIndex, length);

  if (forwardDistance === 0) return "active";
  if (forwardDistance === 1) return "next";
  if (forwardDistance === length - 1) return "previous";
  if (forwardDistance === 2) return "after";
  if (forwardDistance <= length / 2) return "far-after";
  if (forwardDistance === length - 2) return "before";
  return "far-before";
}

export function getResponsiveSlidePosition(
  slideIndex: number,
  activeIndex: number,
  length: number,
): ResponsiveSlidePosition {
  const position = getMobilePosition(slideIndex, activeIndex, length);

  return {
    mobile: position,
    desktop: position,
  };
}

export function createCarouselState(
  activeIndex: number,
  length: number,
): CarouselState {
  return {
    activeIndex: wrapIndex(activeIndex, length),
    direction: null,
    queue: [],
  };
}

export function getVisualActiveIndex(
  state: CarouselState,
  length: number,
): number {
  return state.direction === null
    ? state.activeIndex
    : wrapIndex(state.activeIndex + state.direction, length);
}

export function requestNavigation(
  state: CarouselState,
  direction: NavigationDirection,
  length: number,
  reducedMotion: boolean,
): CarouselState {
  if (reducedMotion) {
    const pendingDirections = [
      ...(state.direction === null ? [] : [state.direction]),
      ...state.queue,
      direction,
    ];
    const destination = pendingDirections.reduce(
      (index, pendingDirection) => index + pendingDirection,
      state.activeIndex,
    );

    return createCarouselState(destination, length);
  }

  if (state.direction === null) {
    return { ...state, direction };
  }

  return { ...state, queue: [...state.queue, direction] };
}

export function completeTransition(
  state: CarouselState,
  length: number,
): CarouselState {
  if (state.direction === null) return state;

  const activeIndex = wrapIndex(
    state.activeIndex + state.direction,
    length,
  );
  const [direction, ...queue] = state.queue;

  return {
    activeIndex,
    direction: direction ?? null,
    queue,
  };
}

export function settleTransitions(
  state: CarouselState,
  length: number,
): CarouselState {
  if (state.direction === null) return state;

  const destination = [state.direction, ...state.queue].reduce(
    (index, direction) => index + direction,
    state.activeIndex,
  );

  return createCarouselState(destination, length);
}
