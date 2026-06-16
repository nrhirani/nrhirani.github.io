/**
 * Tests for HeroLines canvas component.
 * The canvas API is not available in jsdom, so getContext is stubbed.
 * Tests verify the component mounts a canvas element with the right attributes.
 */

import { render } from "@testing-library/react";
import HeroLines from "@/components/HeroLines";

// Stub canvas context methods used by HeroLines
const mockCtx = {
  setTransform: jest.fn(),
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
};

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx);

  // Stub getBoundingClientRect on the parent so resize() gets valid dimensions
  jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    width: 1280,
    height: 800,
    top: 0,
    left: 0,
    right: 1280,
    bottom: 800,
  });

  // Stub matchMedia (used by prefers-reduced-motion check)
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockReturnValue({ matches: false }),
  });

  // Stub rAF/cAF so the animation loop doesn't run
  jest.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("HeroLines", () => {
  test("renders a canvas element", () => {
    const { container } = render(<HeroLines />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  test("canvas has aria-hidden=true", () => {
    const { container } = render(<HeroLines />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  test("canvas is absolutely positioned (covers parent)", () => {
    const { container } = render(<HeroLines />);
    const canvas = container.querySelector("canvas");
    expect(canvas.className).toMatch(/absolute/);
    expect(canvas.className).toMatch(/inset-0/);
  });

  test("canvas has pointer-events-none so it doesn't block clicks", () => {
    const { container } = render(<HeroLines />);
    const canvas = container.querySelector("canvas");
    expect(canvas.className).toMatch(/pointer-events-none/);
  });

  test("calls getContext with '2d'", () => {
    render(<HeroLines />);
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith("2d");
  });
});
