/**
 * Tests for the ScrollToTop button component.
 * Covers: initial hidden state, visibility after scroll, click handler.
 */

import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollToTop from "@/components/ScrollToTop";

window.scrollTo = jest.fn();

beforeEach(() => {
  window.scrollTo.mockClear();
  Object.defineProperty(window, "scrollY", {
    writable: true,
    configurable: true,
    value: 0,
  });
});

describe("ScrollToTop — visibility", () => {
  test("button is in the DOM on mount", () => {
    render(<ScrollToTop />);
    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  test("button has opacity-0 class when scrollY <= 400", () => {
    render(<ScrollToTop />);
    const btn = screen.getByRole("button", { name: /back to top/i });
    expect(btn.className).toMatch(/opacity-0/);
  });

  test("button becomes visible (opacity-100) when scrollY > 400", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 500,
      });
      fireEvent.scroll(window);
    });

    const btn = screen.getByRole("button", { name: /back to top/i });
    expect(btn.className).toMatch(/opacity-100/);
  });

  test("button hides again when scrolled back to top", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 500 });
      fireEvent.scroll(window);
    });
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 0 });
      fireEvent.scroll(window);
    });

    const btn = screen.getByRole("button", { name: /back to top/i });
    expect(btn.className).toMatch(/opacity-0/);
  });
});

describe("ScrollToTop — click handler", () => {
  test("clicking the button calls window.scrollTo with top: 0", async () => {
    const user = userEvent.setup();
    render(<ScrollToTop />);

    await user.click(screen.getByRole("button", { name: /back to top/i }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
