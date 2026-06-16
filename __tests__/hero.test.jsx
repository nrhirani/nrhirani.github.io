/**
 * Tests for the Hero component.
 * Covers: profile name, tagline, hero description, scroll indicator.
 * HeroLines (canvas animation) is mocked — tested separately.
 */

import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";
import { profile } from "@/lib/data";

// HeroLines uses requestAnimationFrame + canvas — stub it out
jest.mock("@/components/HeroLines", () => () => <div data-testid="hero-lines" />);

describe("Hero — content", () => {
  test("renders the profile name as an h1", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: profile.name })).toBeInTheDocument();
  });

  test("renders the tagline", () => {
    render(<Hero />);
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
  });

  test("renders the hero description", () => {
    render(<Hero />);
    expect(screen.getByText(profile.heroDescription)).toBeInTheDocument();
  });

  test("section has id='top' for anchor navigation", () => {
    render(<Hero />);
    expect(document.getElementById("top")).toBeInTheDocument();
  });

  test("renders the scroll indicator", () => {
    render(<Hero />);
    expect(screen.getByText(/scroll/i)).toBeInTheDocument();
  });

  test("renders the HeroLines canvas stub", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-lines")).toBeInTheDocument();
  });
});
