"use client";

import { useState } from "react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { projects, workFilters } from "@/lib/data";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const counts = workFilters.reduce((acc, filter) => {
    acc[filter] =
      filter === "All"
        ? projects.length
        : projects.filter((p) => p.categories.includes(filter)).length;
    return acc;
  }, {});

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="work" className="bg-bg py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-accent text-center font-display font-bold text-4xl sm:text-5xl mb-10">
          My Work
        </h2>

        <div className="max-w-2xl mx-auto text-center text-sm text-ink-muted leading-relaxed space-y-4 mb-14">
          <p>
            Architecting and shipping production AI systems — from LLM-powered
            decision engines to the platforms and pipelines that ship them.
          </p>
          <p>
            Focused on system design, optimization, and reliability — paired with
            the team leadership needed to take ideas from design to production.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 font-mono text-sm">
          {workFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-baseline gap-1 transition-colors ${
                activeFilter === filter
                  ? "text-accent-pink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {filter}
              <sup className="text-[10px]">{String(counts[filter]).padStart(2, "0")}</sup>
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visibleProjects.map((project, index) => (
            <article
              key={project.title}
              className="group bg-bg-card border border-white/5 rounded-xl overflow-hidden hover:border-accent-pink/40 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1a1424] to-[#0d0b14]">
                {project.lottie ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter:
                        index % 2 === 0
                          ? "grayscale(1) sepia(1) hue-rotate(230deg) saturate(4) brightness(0.95) contrast(1.05)"
                          : "grayscale(1) sepia(1) hue-rotate(140deg) saturate(3.5) brightness(0.95) contrast(1.05)",
                    }}
                  >
                    <DotLottieReact
                      src={project.lottie}
                      loop
                      autoplay
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <Image
                    src={project.visual}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-5">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
