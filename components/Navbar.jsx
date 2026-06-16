"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("top")}
          className="group flex items-center gap-3"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gradient bg-[length:140%_140%] bg-left text-white font-display font-bold text-sm tracking-wide shadow-lg shadow-accent-pink/20 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-right group-hover:shadow-accent-cyan/30 group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="hidden sm:flex flex-col items-start leading-tight">
            <span className="font-display font-bold text-lg tracking-tight">
              {profile.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              AI Systems &amp; Leadership
            </span>
          </span>
        </button>

        <div className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium uppercase tracking-widest text-ink-muted hover:text-accent-pink transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-bg-surface border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-sm font-medium uppercase tracking-widest text-ink-muted hover:text-accent-pink transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
