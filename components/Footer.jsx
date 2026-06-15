"use client";

import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { social, profile } from "@/lib/data";

const icons = { Github, Linkedin, Twitter, Mail };

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-white/10 py-12 px-6 relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="flex gap-3">
          {social.map(({ label, href, icon }) => {
            const Icon = icons[icon];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-bg-card border border-white/10 text-ink-muted hover:text-accent-pink hover:border-accent-pink/40 transition-colors"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-pink text-white hover:bg-accent-violet transition-colors"
        >
          <ArrowUp size={18} />
        </button>

        <p className="font-mono text-xs text-ink-dim">
          {profile.name.toUpperCase()} <span className="text-accent-pink">© {year}</span>
        </p>
      </div>
    </footer>
  );
}
