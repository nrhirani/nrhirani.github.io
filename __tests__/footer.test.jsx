/**
 * Tests for the Footer component.
 * Covers: social links, profile name, current year, and back-to-top button.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@/components/Footer";
import { social, profile } from "@/lib/data";

// scrollTo is not implemented in jsdom
window.scrollTo = jest.fn();

beforeEach(() => {
  window.scrollTo.mockClear();
});

describe("Footer — social links", () => {
  test("renders a link for each social entry", () => {
    render(<Footer />);
    social.forEach(({ label }) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });

  test("social links open in a new tab", () => {
    render(<Footer />);
    social.forEach(({ label, href }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});

describe("Footer — profile name and year", () => {
  test("displays the profile name in uppercase", () => {
    render(<Footer />);
    expect(screen.getByText(profile.name.toUpperCase())).toBeInTheDocument();
  });

  test("displays the current year", () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument();
  });
});

describe("Footer — back to top button", () => {
  test("renders the back-to-top button with accessible label", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  test("clicking back-to-top calls window.scrollTo with top: 0", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    await user.click(screen.getByRole("button", { name: /back to top/i }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
