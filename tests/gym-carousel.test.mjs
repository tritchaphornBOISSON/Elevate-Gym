import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { gymSlides } from "../content/site.ts";

let carouselModel = null;

try {
  carouselModel = await import("../components/home/gym-carousel-model.ts");
} catch {
  // The assertion below provides the intentional RED state before the model exists.
}

const expectedSources = [
  "/images/concept/gym-main-concept.png",
  "/images/concept/gym-preview-equipment-concept.png",
  "/images/concept/gym-woman-rdl-concept.png",
  "/images/concept/gym-preview-weights-concept.png",
  "/images/concept/gym-squat-rack-concept.png",
  "/images/concept/gym-dumbbells-concept.png",
];

test("gym slides use the approved six-image concept sequence", async () => {
  assert.equal(gymSlides.length, 6);
  assert.deepEqual(
    gymSlides.map((slide) => slide.src),
    expectedSources,
  );

  for (const slide of gymSlides) {
    assert.equal(slide.concept, true);
    assert.equal(slide.temporary, true);
    assert.match(slide.alt, /^Temporary concept photograph of /);
  }

  await Promise.all(
    gymSlides.map((slide) =>
      access(
        fileURLToPath(new URL(`../public${slide.src}`, import.meta.url)),
      ),
    ),
  );
});

test("desktop exposes previous, active, and next at every index", () => {
  assert.ok(carouselModel, "expected the carousel position model to exist");

  const getVisibleSlideIndices =
    carouselModel.getVisibleSlideIndices ?? (() => []);
  const expected = [
    [5, 0, 1],
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 0],
  ];

  for (let activeIndex = 0; activeIndex < gymSlides.length; activeIndex += 1) {
    assert.deepEqual(
      getVisibleSlideIndices(activeIndex, gymSlides.length, "desktop"),
      expected[activeIndex],
    );

    assert.deepEqual(
      expected[activeIndex].map(
        (slideIndex) =>
          carouselModel.getResponsiveSlidePosition(
            slideIndex,
            activeIndex,
            gymSlides.length,
          ).desktop,
      ),
      ["previous", "active", "next"],
    );
  }
});

test("carousel model exports the client component contract", () => {
  const clientModelExports = [
    "completeTransition",
    "createCarouselState",
    "getResponsiveSlidePosition",
    "getVisualActiveIndex",
    "requestNavigation",
    "settleTransitions",
  ];

  for (const exportName of clientModelExports) {
    assert.equal(
      typeof carouselModel[exportName],
      "function",
      `expected ${exportName} to remain importable by GymCarousel`,
    );
  }
});

test("mobile exposes previous, active, and next at every index", () => {
  assert.ok(carouselModel, "expected the carousel position model to exist");

  const getVisibleSlideIndices =
    carouselModel.getVisibleSlideIndices ?? (() => []);
  const expected = [
    [5, 0, 1],
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 0],
  ];

  for (let activeIndex = 0; activeIndex < gymSlides.length; activeIndex += 1) {
    assert.deepEqual(
      getVisibleSlideIndices(activeIndex, gymSlides.length, "mobile"),
      expected[activeIndex],
    );

    assert.deepEqual(
      expected[activeIndex].map(
        (slideIndex) =>
          carouselModel.getResponsiveSlidePosition(
            slideIndex,
            activeIndex,
            gymSlides.length,
          ).mobile,
      ),
      ["previous", "active", "next"],
    );
  }
});

test("carousel modular navigation remains ordered across repeated wraps", () => {
  assert.ok(carouselModel, "expected the carousel position model to exist");

  const { wrapIndex } = carouselModel;

  assert.equal(wrapIndex(-1, 6), 5);
  assert.equal(wrapIndex(6, 6), 0);
  assert.equal(wrapIndex(17, 6), 5);
  assert.equal(wrapIndex(-13, 6), 5);
  assert.equal(wrapIndex(22, 7), 1);
});

function exerciseQueuedNavigation(directions) {
  const createCarouselState =
    carouselModel.createCarouselState ?? ((activeIndex) => ({ activeIndex }));
  const requestNavigation =
    carouselModel.requestNavigation ?? ((state) => state);
  const completeTransition =
    carouselModel.completeTransition ?? ((state) => state);

  let state = createCarouselState(0, gymSlides.length);

  for (const direction of directions) {
    state = requestNavigation(state, direction, gymSlides.length, false);
  }

  const queuedState = state;
  const committedIndices = [];
  let safetyCount = 0;

  while (state.direction !== null && safetyCount < 20) {
    state = completeTransition(state, gymSlides.length);
    committedIndices.push(state.activeIndex);
    safetyCount += 1;
  }

  return { committedIndices, queuedState, state };
}

test("rapid next input is serialized one adjacent transition at a time", () => {
  const result = exerciseQueuedNavigation([1, 1, 1, 1]);

  assert.equal(result.queuedState.activeIndex, 0);
  assert.deepEqual(result.queuedState.queue, [1, 1, 1]);
  assert.deepEqual(result.committedIndices, [1, 2, 3, 4]);
  assert.equal(result.state.activeIndex, 4);
  assert.equal(result.state.direction, null);
});

test("rapid previous input wraps backward one transition at a time", () => {
  const result = exerciseQueuedNavigation([-1, -1, -1]);

  assert.equal(result.queuedState.activeIndex, 0);
  assert.deepEqual(result.queuedState.queue, [-1, -1]);
  assert.deepEqual(result.committedIndices, [5, 4, 3]);
  assert.equal(result.state.activeIndex, 3);
});

test("mixed rapid input preserves intent order without corrupting state", () => {
  const result = exerciseQueuedNavigation([1, 1, -1, 1, -1]);

  assert.deepEqual(result.queuedState.queue, [1, -1, 1, -1]);
  assert.deepEqual(result.committedIndices, [1, 2, 1, 2, 1]);
  assert.equal(result.state.activeIndex, 1);
});

test("reduced motion applies navigation and settles pending intent immediately", () => {
  const createCarouselState = carouselModel.createCarouselState;
  const requestNavigation = carouselModel.requestNavigation;
  const settleTransitions = carouselModel.settleTransitions;

  assert.equal(typeof createCarouselState, "function");
  assert.equal(typeof requestNavigation, "function");

  let state = createCarouselState(0, gymSlides.length);
  state = requestNavigation(state, -1, gymSlides.length, true);
  state = requestNavigation(state, 1, gymSlides.length, true);

  assert.equal(state.activeIndex, 0);
  assert.equal(state.direction, null);
  assert.deepEqual(state.queue, []);

  state = requestNavigation(state, 1, gymSlides.length, false);
  state = requestNavigation(state, -1, gymSlides.length, false);
  state = requestNavigation(state, 1, gymSlides.length, false);
  state = settleTransitions(state, gymSlides.length);

  assert.equal(state.activeIndex, 1);
  assert.equal(state.direction, null);
  assert.deepEqual(state.queue, []);
});
