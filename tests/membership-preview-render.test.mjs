import assert from "node:assert/strict";
import test from "node:test";

import {
  formatPriceThb,
  membershipPasses,
} from "../content/memberships.ts";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";

test("membership ribbon is present in server-rendered HTML", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);

  const html = await response.text();
  const sectionStart = html.indexOf('<section id="membership"');
  const sectionEnd = html.indexOf("</section>", sectionStart);

  assert.notEqual(sectionStart, -1, "expected the membership section");
  assert.notEqual(sectionEnd, -1, "expected the membership section to close");

  const membershipHtml = html.slice(sectionStart, sectionEnd);

  const missingResponsiveStructure = [];
  const headingMatches = membershipHtml.match(/<h2[^>]*>[\s\S]*?<\/h2>/g);

  assert.equal(headingMatches?.length, 1, "expected one membership h2");

  const headingHtml = headingMatches[0];
  const headingText = headingHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  assert.match(
    headingHtml,
    /class="[^"]*homepage-section-title[^"]*"/,
  );
  assert.equal(headingText, "MEMBERSHIPS THAT FIT YOUR STAY");

  for (const headingPart of ["MEMBERSHIPS", "THAT FIT", "YOUR STAY"]) {
    if (!headingHtml.includes(`>${headingPart}<`)) {
      missingResponsiveStructure.push(`separate ${headingPart} heading part`);
    }
  }

  if (
    !/<span class="block whitespace-nowrap lg:inline">\s*<span>THAT FIT<\/span>[\s\S]*?<span[^>]*>\s*YOUR STAY\s*<\/span>\s*<\/span>/.test(
      headingHtml,
    )
  ) {
    missingResponsiveStructure.push(
      "sub-lg THAT FIT YOUR STAY line grouping",
    );
  }

  if (
    !membershipHtml.includes(
      "Flexible access for a day, a week or a longer commitment.",
    )
  ) {
    missingResponsiveStructure.push("approved membership description");
  }

  if (!/<dl[^>]*class="[^"]*membership-price-grid[^"]*"/.test(membershipHtml)) {
    missingResponsiveStructure.push("mobile crossed-divider grid structure");
  }

  assert.deepEqual(
    missingResponsiveStructure,
    [],
    `missing from server-rendered membership section: ${missingResponsiveStructure.join(", ")}`,
  );
  assert.match(membershipHtml, /<dl[^>]*>/);
  assert.equal(membershipHtml.split("<dt").length - 1, membershipPasses.length);
  assert.equal(membershipHtml.split("<dd").length - 1, membershipPasses.length);

  for (const membershipPass of membershipPasses) {
    assert.match(membershipHtml, new RegExp(`>${membershipPass.label}<`));

    const formattedPrice = formatPriceThb(membershipPass.priceThb);
    const [amount, currency] = formattedPrice.split(" ");

    assert.match(membershipHtml, new RegExp(`>${amount}<`));
    assert.match(membershipHtml, new RegExp(`>${currency}<`));
  }

  assert.match(membershipHtml, /href="#membership"/);
  assert.doesNotMatch(membershipHtml, /provisional/i);
});
