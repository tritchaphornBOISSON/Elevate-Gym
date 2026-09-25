import assert from "node:assert/strict";
import test from "node:test";

import { gymSlides } from "../content/site.ts";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";

test("carousel renders six stable slides with one committed accessible image", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);

  const html = await response.text();

  for (const slide of gymSlides) {
    assert.equal(
      html.split(`alt="${slide.alt}"`).length - 1,
      1,
      `expected one rendered image for ${slide.id}`,
    );
  }

  assert.equal(
    html.split('aria-hidden="true" class="pointer-events-none').length - 1,
    5,
  );
  assert.match(html, /duration-\[450ms\]/);
  assert.match(html, /ease-\[cubic-bezier\(0\.22,1,0\.36,1\)\]/);
  assert.match(html, /transition-\[translate,scale,opacity\]/);
  assert.match(html, /motion-reduce:transition-none/);
});
