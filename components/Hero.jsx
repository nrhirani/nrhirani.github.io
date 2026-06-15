import { profile } from "@/lib/data";
import HeroLines from "./HeroLines";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0e1118] via-[#0a0c12] to-bg px-6 text-center"
    >
      {/* Diagonal line texture, inspired by mattwilldev.com */}
      <HeroLines />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none" />

      {/* Animated gradient orb glow, behind headline */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-accent-gradient blur-[110px] opacity-30 pointer-events-none animate-glow-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full bg-accent-cyan blur-[100px] opacity-20 pointer-events-none animate-glow-pulse-slow"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="font-display font-bold uppercase text-5xl sm:text-7xl md:text-8xl leading-[1.05] mb-6 tracking-tight">
          {profile.name}
        </h1>
        <p className="font-mono text-sm sm:text-base md:text-lg tracking-[0.35em] text-accent-cyan uppercase mb-8">
          {profile.tagline}
        </p>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink-muted leading-relaxed">
          {profile.heroDescription}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-dim">
        <div className="h-9 w-5 rounded-full border border-ink-dim flex items-start justify-center p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-pink animate-scroll-dot" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
