/**
 * Tests for the Articles section component.
 * Covers: article list rendering, links, metadata (date + readTime).
 */

import { render, screen } from "@testing-library/react";
import Articles from "@/components/Articles";
import { articles } from "@/lib/data";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Articles section", () => {
  test("renders the section heading", () => {
    render(<Articles />);
    expect(
      screen.getByRole("heading", { level: 2, name: /articles.*writing/i })
    ).toBeInTheDocument();
  });

  test("renders one article element per article in data", () => {
    render(<Articles />);
    expect(screen.getAllByRole("article")).toHaveLength(articles.length);
  });

  test("each article shows its title", () => {
    render(<Articles />);
    articles.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("each article shows its excerpt", () => {
    render(<Articles />);
    articles.forEach(({ excerpt }) => {
      expect(screen.getByText(excerpt)).toBeInTheDocument();
    });
  });

  test("each article shows its date", () => {
    render(<Articles />);
    articles.forEach(({ date }) => {
      expect(screen.getAllByText(date).length).toBeGreaterThan(0);
    });
  });

  test("each article shows its read time", () => {
    render(<Articles />);
    articles.forEach(({ readTime }) => {
      expect(screen.getAllByText(readTime).length).toBeGreaterThan(0);
    });
  });

  test("each article links to the correct slug", () => {
    render(<Articles />);
    articles.forEach(({ slug }) => {
      const link = document.querySelector(`a[href="/articles/${slug}"]`);
      expect(link).toBeInTheDocument();
    });
  });

  test("section has id='articles' for anchor navigation", () => {
    render(<Articles />);
    expect(document.getElementById("articles")).toBeInTheDocument();
  });
});
