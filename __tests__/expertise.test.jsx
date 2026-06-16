/**
 * Tests for the Expertise section component.
 * Covers: section heading, each expertise card's title, accent label, and description.
 * DotLottieReact is mocked (browser animation library, not available in jsdom).
 */

import { render, screen } from "@testing-library/react";
import Expertise from "@/components/Expertise";
import { expertise } from "@/lib/data";

jest.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="lottie-animation" />,
}));

describe("Expertise section", () => {
  test("renders the section heading", () => {
    render(<Expertise />);
    expect(
      screen.getByRole("heading", { level: 2, name: /my expertise/i })
    ).toBeInTheDocument();
  });

  test("renders an h3 for each expertise item", () => {
    render(<Expertise />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s).toHaveLength(expertise.length);
  });

  test("each expertise title appears in an h3", () => {
    render(<Expertise />);
    expertise.forEach(({ title }) => {
      // getAllByRole handles duplicate text (e.g. multiple items titled "Engineering")
      const matches = screen.getAllByRole("heading", { level: 3, name: title });
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  test("renders the accent label for each item", () => {
    render(<Expertise />);
    // Accents are rendered in <p> elements with a specific class; use getAllByText
    // since an accent value may also appear elsewhere (e.g. as a title)
    expertise.forEach(({ accent }) => {
      expect(screen.getAllByText(accent).length).toBeGreaterThan(0);
    });
  });

  test("renders the description for each item", () => {
    render(<Expertise />);
    expertise.forEach(({ desc }) => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  test("renders the index label for each item", () => {
    render(<Expertise />);
    expertise.forEach(({ index }) => {
      expect(screen.getByText(index)).toBeInTheDocument();
    });
  });

  test("renders a lottie animation for the AI expertise item", () => {
    render(<Expertise />);
    // BrainCircuit item uses DotLottieReact
    expect(screen.getByTestId("lottie-animation")).toBeInTheDocument();
  });

  test("section has id='expertise' for anchor navigation", () => {
    render(<Expertise />);
    expect(document.getElementById("expertise")).toBeInTheDocument();
  });
});
