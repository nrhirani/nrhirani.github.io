/**
 * Tests for the Contact form component.
 * Covers validation paths, successful submission, and error handling.
 *
 * EmailJS and PhoneInput are mocked so no real network calls are made.
 */

import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact";

// ── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("@emailjs/browser", () => ({
  send: jest.fn(),
}));

// Replace the real PhoneInput with a simple text input so userEvent can type
// into it, and expose isValidPhoneNumber as a mockable function.
jest.mock("react-phone-number-input", () => {
  const React = require("react");
  const PhoneInput = React.forwardRef(
    ({ onChange, value, placeholder, className }, ref) => (
      <input
        ref={ref}
        data-testid="phone-input"
        type="tel"
        placeholder={placeholder ?? "Phone number"}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    )
  );
  PhoneInput.displayName = "PhoneInput";
  return {
    __esModule: true,
    default: PhoneInput,
    isValidPhoneNumber: jest.fn((v) => v?.startsWith("+")),
  };
});

// ── Env vars ─────────────────────────────────────────────────────────────────

const ENV = {
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: "svc_test",
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "tpl_test",
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "pub_test",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

import emailjs from "@emailjs/browser";
import { isValidPhoneNumber } from "react-phone-number-input";

const fillName = async (user, name = "Jane Doe") =>
  user.type(screen.getByPlaceholderText("Name"), name);

const fillEmail = async (user, email = "jane@example.com") =>
  user.type(screen.getByPlaceholderText("Enter email"), email);

const fillPhone = async (user, phone = "+14155550100") =>
  user.type(screen.getByTestId("phone-input"), phone);

const fillMessage = async (user, msg = "Hello!") =>
  user.type(screen.getByPlaceholderText("Your message (optional)"), msg);

const submit = async (user) =>
  user.click(screen.getByRole("button", { name: /submit/i }));

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Contact form — validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(process.env, ENV);
  });

  test("shows error when name is empty (required field)", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    // Don't fill name; fill email so we get past the contact check
    await fillEmail(user);
    // HTML5 `required` on the name input prevents submission — no emailjs call
    await submit(user);
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test("shows error when both email and phone are blank", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user);
    await submit(user);
    expect(
      screen.getByText(/Please provide an email address or phone number/i)
    ).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test("shows error for invalid phone number", async () => {
    const user = userEvent.setup();
    isValidPhoneNumber.mockReturnValue(false);
    render(<Contact />);
    await fillName(user);
    await fillPhone(user, "not-a-phone");
    await submit(user);
    expect(
      screen.getByText(/Please enter a valid phone number/i)
    ).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test("clears contact error when email is typed after validation failure", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user);
    await submit(user); // trigger the "provide email or phone" error
    expect(
      screen.getByText(/Please provide an email address or phone number/i)
    ).toBeInTheDocument();
    await fillEmail(user);
    expect(
      screen.queryByText(/Please provide an email address or phone number/i)
    ).not.toBeInTheDocument();
  });
});

describe("Contact form — successful submission", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(process.env, ENV);
    emailjs.send.mockResolvedValue({ status: 200, text: "OK" });
  });

  test("submits with email and shows success message", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user);
    await fillEmail(user);
    await fillMessage(user);
    await submit(user);
    await waitFor(() =>
      expect(screen.getByText(/Thanks for reaching out/i)).toBeInTheDocument()
    );
  });

  test("calls emailjs.send with correct payload", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user, "Alice");
    await fillEmail(user, "alice@example.com");
    await fillMessage(user, "Hi there!");
    await submit(user);
    await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));
    expect(emailjs.send).toHaveBeenCalledWith(
      "svc_test",
      "tpl_test",
      expect.objectContaining({
        name: "Alice",
        email: "alice@example.com",
        message: "Hi there!",
      }),
      { publicKey: "pub_test" }
    );
  });

  test("resets form fields after successful submission", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user, "Bob");
    await fillEmail(user, "bob@example.com");
    await submit(user);
    // After success the form is replaced by the thank-you message
    await waitFor(() =>
      expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument()
    );
  });

  test("shows 'Sending' and disables button while in-flight", async () => {
    let resolve;
    emailjs.send.mockReturnValue(new Promise((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user);
    await fillEmail(user);
    await submit(user);
    const btn = screen.getByRole("button", { name: /sending/i });
    expect(btn).toBeDisabled();
    // Resolve inside act() so the resulting state updates are flushed
    // before the test ends — prevents act() warnings leaking into later tests.
    await act(async () => {
      resolve({ status: 200 });
    });
  });
});

describe("Contact form — error handling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(process.env, ENV);
  });

  test("shows generic error message when emailjs.send rejects", async () => {
    emailjs.send.mockRejectedValue(new Error("Network error"));
    // "EmailJS send failed: …" is expected — silence it so it doesn't pollute output.
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user);
    await fillEmail(user);
    await submit(user);
    await waitFor(() =>
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    );
    consoleSpy.mockRestore();
  });

  test("shows error when EmailJS env vars are missing", async () => {
    delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    // "EmailJS env vars are missing" is expected — silence it.
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Contact />);
    await fillName(user);
    await fillEmail(user);
    await submit(user);
    await waitFor(() =>
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    );
    expect(emailjs.send).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
