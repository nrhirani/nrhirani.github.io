/**
 * Tests for the Experience accordion component.
 * Covers: rendering all jobs, default open state, expand/collapse interactions.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Experience from "@/components/Experience";
import { experience } from "@/lib/data";

describe("Experience — rendering", () => {
  test("renders the section heading", () => {
    render(<Experience />);
    expect(
      screen.getByRole("heading", { level: 2, name: /professional experience/i })
    ).toBeInTheDocument();
  });

  test("renders a button for each job", () => {
    render(<Experience />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(experience.length);
  });

  test("each button label contains the role and company", () => {
    render(<Experience />);
    experience.forEach(({ role, company }) => {
      expect(
        screen.getByRole("button", { name: new RegExp(`${role}.*${company}`, "i") })
      ).toBeInTheDocument();
    });
  });

  test("section has id='experience' for anchor navigation", () => {
    render(<Experience />);
    expect(document.getElementById("experience")).toBeInTheDocument();
  });
});

describe("Experience — accordion default state", () => {
  test("first item is open by default (aria-expanded=true)", () => {
    render(<Experience />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
  });

  test("subsequent items are closed by default (aria-expanded=false)", () => {
    render(<Experience />);
    const buttons = screen.getAllByRole("button");
    buttons.slice(1).forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  test("first job's description is visible on load", () => {
    render(<Experience />);
    expect(screen.getByText(experience[0].desc)).toBeInTheDocument();
  });
});

describe("Experience — expand/collapse interactions", () => {
  test("clicking a closed item opens it", async () => {
    const user = userEvent.setup();
    render(<Experience />);

    const buttons = screen.getAllByRole("button");
    const secondBtn = buttons[1];
    expect(secondBtn).toHaveAttribute("aria-expanded", "false");

    await user.click(secondBtn);
    expect(secondBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(experience[1].desc)).toBeInTheDocument();
  });

  test("clicking an open item closes it", async () => {
    const user = userEvent.setup();
    render(<Experience />);

    const buttons = screen.getAllByRole("button");
    const firstBtn = buttons[0];
    expect(firstBtn).toHaveAttribute("aria-expanded", "true");

    await user.click(firstBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(experience[0].desc)).not.toBeInTheDocument();
  });

  test("opening a second item closes the first", async () => {
    const user = userEvent.setup();
    render(<Experience />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);

    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });

  test("open item shows job location", () => {
    render(<Experience />);
    expect(screen.getByText(experience[0].location)).toBeInTheDocument();
  });

  test("open item shows tech tags", () => {
    render(<Experience />);
    experience[0].tech.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
