/**
 * Tests for the Quote component.
 */

import { render, screen } from "@testing-library/react";
import Quote from "@/components/Quote";
import { quote } from "@/lib/data";

describe("Quote", () => {
  test("renders the quote text", () => {
    render(<Quote />);
    expect(screen.getByText(quote.text)).toBeInTheDocument();
  });

  test("renders the quote author", () => {
    render(<Quote />);
    expect(screen.getByText(quote.author)).toBeInTheDocument();
  });
});
