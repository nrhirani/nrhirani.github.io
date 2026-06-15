"use client";

import { Users, BrainCircuit, Code2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { expertise } from "@/lib/data";

const icons = { Users, BrainCircuit, Code2 };

export default function Expertise() {
  return (
    <section id="expertise" className="bg-bg py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-accent text-center font-display font-bold text-4xl sm:text-5xl mb-20">
          My Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {expertise.map((item) => {
            const Icon = icons[item.icon];
            const isAI = item.icon === "BrainCircuit";
            return (
              <div key={item.index} className="px-0 md:px-10 py-10 first:pt-0 md:py-0">
                <div className="flex items-center justify-between mb-6">
                  {isAI ? (
                    <div className="w-7 h-7">
                      <DotLottieReact
                        src="https://assets-v2.lottiefiles.com/a/fd4cc55c-1183-11ee-a6fe-978d39bc2cbf/uhWIoyUG7i.lottie"
                        loop
                        autoplay
                      />
                    </div>
                  ) : (
                    <Icon className="text-accent-pink" size={28} strokeWidth={1.5} />
                  )}
                  <span className="font-mono text-xs text-ink-dim">{item.index}</span>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan underline underline-offset-4 mb-1">
                  {item.accent}
                </p>
                <h3 className="font-display font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
