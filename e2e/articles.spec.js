const { test, expect } = require("@playwright/test");

test.describe("Articles — list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("articles section renders with at least one article", async ({
    page,
  }) => {
    await page.locator("#articles").scrollIntoViewIfNeeded();
    await expect(page.locator("#articles")).toBeVisible();
    const articles = page.locator("#articles article");
    await expect(articles.first()).toBeVisible();
  });

  test("each article card shows a title, date, and read time", async ({
    page,
  }) => {
    await page.locator("#articles").scrollIntoViewIfNeeded();
    const first = page.locator("#articles article").first();
    // h3 title
    await expect(first.locator("h3")).toBeVisible();
    // date + read time metadata row
    const meta = first.locator("div.font-mono");
    await expect(meta).toBeVisible();
  });
});

test.describe("Articles — article page", () => {
  test("clicking an article navigates to its page", async ({ page }) => {
    await page.goto("/");
    await page.locator("#articles").scrollIntoViewIfNeeded();

    const firstCard = page.locator("#articles article").first();
    const title = (await firstCard.locator("h3").textContent()).trim();

    await firstCard.click();
    await expect(page).toHaveURL(/\/articles\//);
    await expect(page.locator("h1")).toContainText(title);
  });

  test("article page shows reading progress bar", async ({ page }) => {
    await page.goto(
      "/articles/ai-engineering-production-grade-systems"
    );
    // Progress bar is the fixed top bar inside ReadingProgress
    await expect(page.locator(".fixed.top-0.inset-x-0")).toBeVisible();
  });

  test("article page shows article title in header", async ({ page }) => {
    await page.goto(
      "/articles/ai-engineering-production-grade-systems"
    );
    await expect(page.locator("h1")).toBeVisible();
    const h1Text = await page.locator("h1").textContent();
    expect(h1Text.length).toBeGreaterThan(0);
  });

  test("back to articles link navigates back to homepage", async ({ page }) => {
    await page.goto(
      "/articles/ai-engineering-production-grade-systems"
    );
    await page.locator('a[href="/#articles"]').click();
    await expect(page).toHaveURL(/\/#articles|\/$/);
  });

  test('"More Articles" section shows other articles', async ({ page }) => {
    await page.goto(
      "/articles/ai-engineering-production-grade-systems"
    );
    await page.locator("text=More Articles").scrollIntoViewIfNeeded();
    await expect(page.getByText("More Articles")).toBeVisible();
    // At least one other article card
    const otherCards = page.locator('a[href^="/articles/"]');
    await expect(otherCards.first()).toBeVisible();
  });

  test("experience accordion expands and collapses on click", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();

    const buttons = page.locator("#experience button[aria-expanded]");
    const first = buttons.first();

    // First entry is open by default (openIndex starts at 0)
    const initialExpanded = await first.getAttribute("aria-expanded");
    if (initialExpanded === "true") {
      await first.click();
      await expect(first).toHaveAttribute("aria-expanded", "false");
      await first.click();
      await expect(first).toHaveAttribute("aria-expanded", "true");
    } else {
      await first.click();
      await expect(first).toHaveAttribute("aria-expanded", "true");
    }
  });
});
