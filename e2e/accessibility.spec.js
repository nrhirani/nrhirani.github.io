const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

/**
 * Automated accessibility audits using axe-core.
 * Tags: wcag2a + wcag2aa — catches contrast, missing labels, invalid ARIA, etc.
 *
 * Note: axe-core only catches ~30% of a11y issues automatically.
 * Use these tests as a baseline, not a full audit.
 */

function formatViolations(violations) {
  return violations
    .map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.description}\n` +
        v.nodes
          .slice(0, 2)
          .map((n) => `  → ${n.html}`)
          .join("\n")
    )
    .join("\n\n");
}

test.describe("Accessibility — home page", () => {
  test("no WCAG 2.1 AA violations on page load", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });

  test("no violations in the expertise section", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .include("#expertise")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });

  test("no violations in the contact section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });

  test("no violations in the experience section", async ({ page }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .include("#experience")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });

  test("no violations in the footer", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .include("footer")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });
});

test.describe("Accessibility — article page", () => {
  test("no WCAG 2.1 AA violations on article page", async ({ page }) => {
    await page.goto(
      "/articles/ai-engineering-production-grade-systems"
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });

  test("no violations in the article body", async ({ page }) => {
    await page.goto(
      "/articles/ai-engineering-production-grade-systems"
    );
    const results = await new AxeBuilder({ page })
      .include("article")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations,
      formatViolations(results.violations)
    ).toHaveLength(0);
  });
});
