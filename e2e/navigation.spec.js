const { test, expect } = require("@playwright/test");

// Click a nav section button on any viewport.
// On mobile (< 768px) the desktop nav is hidden — open the hamburger first.
async function clickNav(page, namePattern) {
  const { width } = page.viewportSize() ?? { width: 1280 };
  if (width < 768) {
    const toggle = page.getByRole("button", { name: /toggle menu/i });
    const expanded = await toggle.getAttribute("aria-expanded");
    if (expanded !== "true") await toggle.click();
    await page
      .locator(".md\\:hidden button", { hasText: namePattern })
      .click();
  } else {
    await page.getByRole("button", { name: namePattern }).first().click();
  }
}

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title contains the portfolio name", async ({ page }) => {
    await expect(page).toHaveTitle(/Nishit Hirani/);
  });

  test("hero section is visible on load", async ({ page }) => {
    await expect(page.locator("#top")).toBeVisible();
  });

  test("nav — Expertise scrolls to expertise section", async ({ page }) => {
    await clickNav(page, /expertise/i);
    await expect(page.locator("#expertise")).toBeInViewport();
  });

  test("nav — Work scrolls to work section", async ({ page }) => {
    await clickNav(page, /^work$/i);
    await expect(page.locator("#work")).toBeInViewport();
  });

  test("nav — Articles scrolls to articles section", async ({ page }) => {
    await clickNav(page, /^articles$/i);
    await expect(page.locator("#articles")).toBeInViewport();
  });

  test("nav — Experience scrolls to experience section", async ({ page }) => {
    await clickNav(page, /experience/i);
    await expect(page.locator("#experience")).toBeInViewport();
  });

  test("nav — Contact scrolls to contact section", async ({ page }) => {
    await clickNav(page, /contact/i);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("mobile — hamburger opens and closes the menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const toggle = page.getByRole("button", { name: /toggle menu/i });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    // The mobile nav panel is the md:hidden flex-col div that conditionally mounts
    const mobileMenuPanel = page.locator(".md\\:hidden.flex-col");
    await expect(mobileMenuPanel).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // Panel is unmounted when closed — should not be in viewport
    await expect(mobileMenuPanel).not.toBeVisible();
  });

  test("mobile — clicking a nav link closes the menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.getByRole("button", { name: /toggle menu/i }).click();

    // Click the mobile Work button (inside the mobile dropdown)
    const mobileWorkBtn = page
      .locator(".md\\:hidden button", { hasText: /^work$/i })
      .last();
    await mobileWorkBtn.click();

    await expect(
      page.getByRole("button", { name: /toggle menu/i })
    ).toHaveAttribute("aria-expanded", "false");
  });
});
