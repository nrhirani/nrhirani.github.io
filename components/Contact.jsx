"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ArrowUpRight, Mail, Users, Lightbulb, Loader2 } from "lucide-react";

const openTo = [
  {
    icon: Users,
    border: "border-accent-pink",
    title: "Mentoring & technical discussions",
    desc: "Happy to talk through LLM architecture, system design, and engineering leadership challenges.",
  },
  {
    icon: Lightbulb,
    border: "border-accent-violet",
    title: "Open source & research",
    desc: "Interested in collaborative open source projects and research around production AI systems.",
  },
  {
    icon: Mail,
    border: "border-accent-cyan",
    title: "Let's connect",
    desc: "Reach out about roles, collaborations, or just to talk shop about AI engineering.",
  },
];

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [phone, setPhone] = useState();
  // status: "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");
  // fieldErrors keys: name, contact (email/phone required), phone (invalid), general (send failure)
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setFieldErrors((prev) => ({ ...prev, contact: undefined }));
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setFieldErrors((prev) => ({ ...prev, contact: undefined, phone: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (!form.email.trim() && !phone) {
      setStatus("error");
      setFieldErrors({ contact: "Please provide an email address or phone number." });
      return;
    }

    if (phone && !isValidPhoneNumber(phone)) {
      setStatus("error");
      setFieldErrors({ phone: "Please enter a valid phone number." });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        "EmailJS env vars are missing. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
      );
      setStatus("error");
      setFieldErrors({
        general: "Something went wrong sending your message. Please try again, or email me directly.",
      });
      return;
    }

    setStatus("sending");
    setFieldErrors({});

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email || "Not provided",
          phone: phone || "Not provided",
          message: form.message || "No message provided",
        },
        { publicKey }
      );
      setStatus("success");
      setForm(initialForm);
      setPhone(undefined);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setFieldErrors({
        general: "Something went wrong sending your message. Please try again, or email me directly.",
      });
    }
  };

  return (
    <section id="contact" className="bg-bg-panel py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: form */}
        <div>
          <h2 className="heading-accent heading-accent-left font-display font-bold text-4xl sm:text-5xl mb-4">
            Contact
          </h2>
          <p className="text-accent-cyan text-sm mb-10">
            Have a question or want to work together?
          </p>

          {status === "success" ? (
            <div className="rounded-lg border border-accent-cyan/40 bg-accent-cyan/5 px-6 py-8 text-sm text-ink">
              Thanks for reaching out — your message has been sent. I&rsquo;ll get back to
              you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-bg-card border border-white/10 rounded-md px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none focus:border-accent-pink transition-colors"
              />
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-bg-card border rounded-md px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none transition-colors ${
                    fieldErrors.contact
                      ? "border-accent-pink"
                      : "border-white/10 focus:border-accent-pink"
                  }`}
                />
              </div>
              <div>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  placeholder="Phone number"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`contact-phone-input ${
                    fieldErrors.phone || fieldErrors.contact ? "contact-phone-input-error" : ""
                  }`}
                />
                {fieldErrors.phone && (
                  <p className="text-xs text-accent-pink mt-1.5">{fieldErrors.phone}</p>
                )}
                {fieldErrors.contact && (
                  <p className="text-xs text-accent-pink mt-1.5">{fieldErrors.contact}</p>
                )}
                {!fieldErrors.phone && !fieldErrors.contact && (
                  <p className="text-xs text-ink-dim mt-1.5">
                    Email or phone number required so I can get back to you.
                  </p>
                )}
              </div>
              <textarea
                name="message"
                rows={5}
                placeholder="Your message (optional)"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-bg-card border border-white/10 rounded-md px-4 py-3 text-sm placeholder:text-ink-dim focus:outline-none focus:border-accent-pink transition-colors resize-none"
              />
              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-accent-pink hover:text-accent-pink rounded-md px-6 py-3 text-xs font-mono uppercase tracking-[0.25em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-ink"
                >
                  {status === "sending" ? (
                    <>
                      Sending
                      <Loader2 size={14} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>
                {fieldErrors.general && (
                  <p className="text-xs text-accent-pink mt-2">{fieldErrors.general}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Right: open-to cards */}
        <div className="space-y-6">
          {openTo.map(({ icon: Icon, border, title, desc }) => (
            <div
              key={title}
              className={`bg-bg-card border-t-2 ${border} rounded-md p-6`}
            >
              <Icon className="text-ink-muted mb-3" size={20} />
              <h3 className="font-display font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
