/**
 * Tests for the ReadingProgress bar component.
 * Covers: initial render at 0%, progress updates on scroll/resize.
 */

import { render, act, fireEvent } from "@testing-library/react";
import ReadingProgress from "@/components/ReadingProgress";

function setScrollState({ scrollY = 0, scrollHeight = 1000, innerHeight = 800 } = {}) {
  Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: scrollY });
  Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: innerHeight });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    writable: true,
    configurable: true,
    value: scrollHeight,
  });
}

beforeEach(() => {
  setScrollState();
});

describe("ReadingProgress", () => {
  test("renders the fixed top bar", () => {
    const { container } = render(<ReadingProgress />);
    const outer = container.querySelector(".fixed.top-0.inset-x-0");
    expect(outer).toBeInTheDocument();
  });

  test("progress bar starts at 0% width", () => {
    const { container } = render(<ReadingProgress />);
    const bar = container.querySelector(".h-full");
    expect(bar.style.width).toBe("0%");
  });

  test("progress bar updates on scroll", () => {
    const { container } = render(<ReadingProgress />);

    act(() => {
      // scrollHeight=1000, innerHeight=500 → docHeight=500, scrollY=250 → 50%
      setScrollState({ scrollY: 250, scrollHeight: 1000, innerHeight: 500 });
      fireEvent.scroll(window);
    });

    const bar = container.querySelector(".h-full");
    expect(bar.style.width).toBe("50%");
  });

  test("progress bar caps at 100% when scrolled to bottom", () => {
    const { container } = render(<ReadingProgress />);

    act(() => {
      setScrollState({ scrollY: 1000, scrollHeight: 1000, innerHeight: 500 });
      fireEvent.scroll(window);
    });

    const bar = container.querySelector(".h-full");
    expect(bar.style.width).toBe("100%");
  });

  test("progress bar stays 0% when document is not scrollable", () => {
    const { container } = render(<ReadingProgress />);

    act(() => {
      // innerHeight >= scrollHeight → docHeight = 0
      setScrollState({ scrollY: 0, scrollHeight: 500, innerHeight: 500 });
      fireEvent.scroll(window);
    });

    const bar = container.querySelector(".h-full");
    expect(bar.style.width).toBe("0%");
  });

  test("progress bar updates on window resize", () => {
    const { container } = render(<ReadingProgress />);

    act(() => {
      setScrollState({ scrollY: 300, scrollHeight: 1000, innerHeight: 400 });
      fireEvent.resize(window);
    });

    const bar = container.querySelector(".h-full");
    const width = parseFloat(bar.style.width);
    expect(width).toBeGreaterThan(0);
    expect(width).toBeLessThanOrEqual(100);
  });
});
