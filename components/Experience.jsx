"use client";

import { useState } from "react";
import { MapPin, Plus, Minus } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="bg-bg py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="heading-accent text-center font-display font-bold text-4xl sm:text-5xl mb-16">
          Professional Experience
        </h2>

        <div className="space-y-3">
          {experience.map((job, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={`${job.company}-${job.period}`} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors ${
                    isOpen ? "bg-accent-gradient" : "bg-bg-panel hover:bg-bg-card"
                  }`}
                >
                  <span className="font-display font-semibold text-sm sm:text-base">
                    {job.role} @ {job.company}
                  </span>
                  <span className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-xs sm:text-sm text-ink-muted">
                      {job.period}
                    </span>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="bg-panel-gradient px-6 py-8">
                    <div className="flex items-center gap-2 text-xs font-mono text-ink-muted mb-4">
                      <MapPin size={14} className="text-accent-cyan" />
                      {job.location}
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed mb-6">
                      {job.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
