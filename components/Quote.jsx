import { Quote as QuoteIcon } from "lucide-react";
import { quote } from "@/lib/data";

export default function Quote() {
  return (
    <section className="relative bg-bg-surface py-20 md:py-28 px-6 border-y border-white/5 overflow-hidden">
      {/* Ambient accent glow, consistent with hero treatment */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-accent-gradient blur-[120px] opacity-10 pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <QuoteIcon
          aria-hidden="true"
          strokeWidth={1.5}
          className="mx-auto mb-6 h-9 w-9 text-accent-pink/50"
        />
        <p className="font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-snug">
          {quote.text}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-accent-gradient" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
            {quote.author}
          </p>
          <span className="h-px w-10 bg-accent-gradient" />
        </div>
      </div>
    </section>
  );
}
