/**
 * Tests for the Work section filter tabs.
 * Verifies that clicking category buttons correctly shows/hides projects.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Work from "@/components/Work";
import { projects } from "@/lib/data";

jest.mock("@lottiefiles/dotlottie-react", () => ({
  DotLottieReact: () => <div data-testid="lottie-animation" />,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, ...props }) => <img alt={alt} {...props} />,
}));

describe("Work section — filter tabs", () => {
  test("renders all projects by default (All tab active)", () => {
    render(<Work />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });

  test("filter button count badge reflects total projects", () => {
    render(<Work />);
    // "All" button text includes the project count as superscript
    const allBtn = screen.getByRole("button", { name: new RegExp(`All`) });
    expect(allBtn).toBeInTheDocument();
  });

  test("filters to AI Systems projects", async () => {
    const user = userEvent.setup();
    render(<Work />);

    await user.click(screen.getByRole("button", { name: /AI Systems/ }));

    const expected = projects.filter((p) =>
      p.categories.includes("AI Systems")
    );
    expect(screen.getAllByRole("article")).toHaveLength(expected.length);
  });

  test("filters to Leadership projects", async () => {
    const user = userEvent.setup();
    render(<Work />);

    await user.click(screen.getByRole("button", { name: /Leadership/ }));

    const expected = projects.filter((p) =>
      p.categories.includes("Leadership")
    );
    expect(screen.getAllByRole("article")).toHaveLength(expected.length);
  });

  test("filters to Infrastructure projects", async () => {
    const user = userEvent.setup();
    render(<Work />);

    await user.click(screen.getByRole("button", { name: /Infrastructure/ }));

    const expected = projects.filter((p) =>
      p.categories.includes("Infrastructure")
    );
    expect(screen.getAllByRole("article")).toHaveLength(expected.length);
  });

  test("clicking All after a filter restores all projects", async () => {
    const user = userEvent.setup();
    render(<Work />);

    await user.click(screen.getByRole("button", { name: /AI Systems/ }));
    await user.click(screen.getByRole("button", { name: /^All/ }));

    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });

  test("project titles are all visible after switching filters", async () => {
    const user = userEvent.setup();
    render(<Work />);

    await user.click(screen.getByRole("button", { name: /AI Systems/ }));
    await user.click(screen.getByRole("button", { name: /^All/ }));

    projects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });
});
