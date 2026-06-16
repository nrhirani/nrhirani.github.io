/**
 * Tests for ArticleBody component:
 * - renderInline() bold and inline-code parsing
 * - All supported block types render correctly
 */

import { render, screen } from "@testing-library/react";
import ArticleBody from "@/components/ArticleBody";

// Stub out diagram components — tested separately if needed
jest.mock("@/components/diagrams", () => ({ diagrams: {} }));

describe("ArticleBody — inline rendering", () => {
  test("renders **bold** text as <strong>", () => {
    render(<ArticleBody sections={[{ p: "Hello **world**" }]} />);
    const el = screen.getByText("world");
    expect(el.tagName).toBe("STRONG");
  });

  test("renders ~code~ as <code>", () => {
    render(<ArticleBody sections={[{ p: "Run ~npm install~" }]} />);
    const el = screen.getByText("npm install");
    expect(el.tagName).toBe("CODE");
  });

  test("renders plain text unchanged", () => {
    render(<ArticleBody sections={[{ p: "Just plain text" }]} />);
    expect(screen.getByText("Just plain text")).toBeInTheDocument();
  });

  test("renders mixed bold and code in the same paragraph", () => {
    render(<ArticleBody sections={[{ p: "Use **this** with ~that~" }]} />);
    expect(screen.getByText("this").tagName).toBe("STRONG");
    expect(screen.getByText("that").tagName).toBe("CODE");
  });
});

describe("ArticleBody — block types", () => {
  test("renders h2 heading", () => {
    render(<ArticleBody sections={[{ h2: "Section Title" }]} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Section Title/ })
    ).toBeInTheDocument();
  });

  test("renders h3 heading", () => {
    render(<ArticleBody sections={[{ h3: "Sub Section" }]} />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Sub Section/ })
    ).toBeInTheDocument();
  });

  test("renders paragraph", () => {
    render(<ArticleBody sections={[{ p: "A paragraph." }]} />);
    expect(screen.getByText("A paragraph.")).toBeInTheDocument();
  });

  test("renders unordered list", () => {
    render(<ArticleBody sections={[{ ul: ["Alpha", "Beta", "Gamma"] }]} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Gamma")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders ordered list", () => {
    render(<ArticleBody sections={[{ ol: ["First", "Second"] }]} />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  test("renders code block with text", () => {
    render(<ArticleBody sections={[{ code: { text: "const x = 42" } }]} />);
    expect(screen.getByText("const x = 42")).toBeInTheDocument();
  });

  test("renders blockquote", () => {
    render(
      <ArticleBody
        sections={[{ quote: "Ship fast, learn faster.", cite: "Unknown" }]}
      />
    );
    expect(screen.getByText("Ship fast, learn faster.")).toBeInTheDocument();
    expect(screen.getByText("— Unknown")).toBeInTheDocument();
  });

  test("renders blockquote without cite", () => {
    render(<ArticleBody sections={[{ quote: "No cite here." }]} />);
    expect(screen.getByText("No cite here.")).toBeInTheDocument();
    expect(screen.queryByText(/^—/)).not.toBeInTheDocument();
  });

  test("renders table with headers and rows", () => {
    render(
      <ArticleBody
        sections={[
          {
            table: {
              head: ["Tool", "Purpose"],
              rows: [
                ["Jest", "Unit tests"],
                ["Playwright", "E2E tests"],
              ],
            },
          },
        ]}
      />
    );
    expect(screen.getByText("Tool")).toBeInTheDocument();
    expect(screen.getByText("Purpose")).toBeInTheDocument();
    expect(screen.getByText("Jest")).toBeInTheDocument();
    expect(screen.getByText("E2E tests")).toBeInTheDocument();
  });

  test("renders callout with title and body", () => {
    render(
      <ArticleBody
        sections={[{ callout: { title: "Pro Tip", text: "Read the docs." } }]}
      />
    );
    expect(screen.getByText("Pro Tip")).toBeInTheDocument();
    expect(screen.getByText("Read the docs.")).toBeInTheDocument();
  });

  test("renders callout without title", () => {
    render(
      <ArticleBody sections={[{ callout: { text: "No title callout." } }]} />
    );
    expect(screen.getByText("No title callout.")).toBeInTheDocument();
  });

  test("skips unknown block types without crashing", () => {
    const { container } = render(
      <ArticleBody sections={[{ unknown: "ignored" }]} />
    );
    // The wrapper div exists but has no rendered children
    expect(container.querySelector(".space-y-6")).toBeEmptyDOMElement();
  });

  test("renders multiple sections in order", () => {
    render(
      <ArticleBody
        sections={[
          { h2: "First" },
          { p: "A paragraph between headings." },
          { h2: "Second" },
        ]}
      />
    );
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings[0]).toHaveTextContent("First");
    expect(headings[1]).toHaveTextContent("Second");
  });
});
