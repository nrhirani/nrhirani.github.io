const { test, expect } = require("@playwright/test");

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    // Intercept EmailJS so no real emails are sent during tests
    await page.route("**/api.emailjs.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: 200, text: "OK" }),
      })
    );
    await page.goto("/#contact");
    // Scroll the form into view
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("contact section is visible", async ({ page }) => {
    await expect(page.locator("#contact")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /contact/i })
    ).toBeVisible();
  });

  test("shows validation error with no email or phone", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.click('button[type="submit"]');
    await expect(
      page.getByText(/Please provide an email address or phone number/i)
    ).toBeVisible();
  });

  test("submits successfully with a valid email", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Hello from Playwright!");
    await page.click('button[type="submit"]');
    await expect(
      page.getByText(/Thanks for reaching out/i)
    ).toBeVisible({ timeout: 10_000 });
  });

  test("submit button is disabled while sending", async ({ page }) => {
    // Delay the EmailJS response so we can catch the in-flight state
    await page.route("**/api.emailjs.com/**", async (route) => {
      await new Promise((r) => setTimeout(r, 1500));
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: 200, text: "OK" }),
      });
    });

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.click('button[type="submit"]');

    const btn = page.getByRole("button", { name: /sending/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeDisabled();
  });

  test("open-to cards are all visible", async ({ page }) => {
    await expect(
      page.getByText(/Mentoring & technical discussions/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Open source & research/i)
    ).toBeVisible();
    await expect(page.getByText(/Let's connect/i)).toBeVisible();
  });
});
