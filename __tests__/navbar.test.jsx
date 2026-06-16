/**
 * Tests for the Navbar component.
 * Covers: profile branding, desktop nav links, mobile hamburger toggle,
 * scroll-activated backdrop, and scrollToSection behaviour.
 */

import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { navLinks, profile } from "@/lib/data";

// scrollIntoView is not implemented in jsdom
window.HTMLElement.prototype.scrollIntoView = jest.fn();

beforeEach(() => {
  // Reset scrollY before each test
  Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 0 });
});

describe("Navbar — branding", () => {
  test("displays the profile initials", () => {
    render(<Navbar />);
    expect(screen.getByText(profile.initials)).toBeInTheDocument();
  });

  test("displays the profile name", () => {
    render(<Navbar />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });
});

describe("Navbar — desktop nav links", () => {
  test("renders all nav link labels", () => {
    render(<Navbar />);
    navLinks.forEach(({ label }) => {
      // There may be two instances (desktop + mobile hidden), getAllByRole is safe
      expect(screen.getAllByRole("button", { name: new RegExp(label, "i") }).length).toBeGreaterThan(0);
    });
  });
});

describe("Navbar — mobile hamburger", () => {
  test("renders the toggle button with aria-expanded=false initially", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("clicking toggle opens the mobile menu and sets aria-expanded=true", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    // The mobile panel contains nav link buttons
    const mobilePanel = document.querySelector(".md\\:hidden.flex-col");
    expect(mobilePanel).toBeInTheDocument();
  });

  test("clicking toggle again closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(toggle);
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".md\\:hidden.flex-col")).not.toBeInTheDocument();
  });

  test("clicking a mobile nav link closes the menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Open menu
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(toggle);

    // Click the first mobile nav button (inside the mobile panel)
    const mobilePanel = document.querySelector(".md\\:hidden.flex-col");
    const firstMobileBtn = mobilePanel.querySelector("button");
    await user.click(firstMobileBtn);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Navbar — scroll behaviour", () => {
  test("adds backdrop class after scrolling past 12px", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");

    expect(nav.className).not.toMatch(/backdrop-blur/);

    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 50 });
      fireEvent.scroll(window);
    });

    expect(nav.className).toMatch(/backdrop-blur/);
  });

  test("removes backdrop class when scrolled back to top", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");

    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 50 });
      fireEvent.scroll(window);
    });
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 0 });
      fireEvent.scroll(window);
    });

    expect(nav.className).not.toMatch(/backdrop-blur/);
  });
});

describe("Navbar — scrollToSection", () => {
  test("clicking a desktop nav button calls scrollIntoView on the target element", async () => {
    const user = userEvent.setup();

    // Create a fake section element matching the first nav link id
    const sectionId = navLinks[0].id;
    const fakeSection = document.createElement("div");
    fakeSection.id = sectionId;
    document.body.appendChild(fakeSection);

    render(<Navbar />);

    const btn = screen.getAllByRole("button", { name: new RegExp(navLinks[0].label, "i") })[0];
    await user.click(btn);

    expect(fakeSection.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(fakeSection);
  });
});
