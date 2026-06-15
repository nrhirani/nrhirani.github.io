// Renders structured article content (see lib/articles/*.js for the data shape).
// Supported block types: h2, h3, p, ul, ol, code, quote, table, callout, diagram.
// Inline syntax inside p/ul/ol/quote text: **bold** and ~inline code~.

import { diagrams } from "@/components/diagrams";

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|~[^~]+~)/g).filter((p) => p !== "");
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-ink font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("~") && part.endsWith("~")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-bg-card border border-white/10 text-accent-cyan text-[0.85em] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function ArticleBody({ sections }) {
  return (
    <div className="space-y-6">
      {sections.map((s, i) => {
        if (s.h2) {
          return (
            <h2
              key={i}
              className="flex items-center gap-3 font-display font-bold text-2xl sm:text-3xl text-ink mt-14 mb-2 first:mt-0"
            >
              <span aria-hidden="true" className="h-6 w-1 shrink-0 rounded-full bg-accent-gradient" />
              {s.h2}
            </h2>
          );
        }

        if (s.h3) {
          return (
            <h3
              key={i}
              className="flex items-center gap-2.5 font-display font-semibold text-lg sm:text-xl text-ink mt-10 mb-1"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
              {s.h3}
            </h3>
          );
        }

        if (s.p) {
          return (
            <p key={i} className="text-ink-muted leading-relaxed text-base sm:text-[1.05rem]">
              {renderInline(s.p)}
            </p>
          );
        }

        if (s.ul) {
          return (
            <ul key={i} className="list-disc pl-6 space-y-2 text-ink-muted leading-relaxed text-base sm:text-[1.05rem] marker:text-accent-pink">
              {s.ul.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (s.ol) {
          return (
            <ol key={i} className="list-decimal pl-6 space-y-2 text-ink-muted leading-relaxed text-base sm:text-[1.05rem] marker:text-accent-pink marker:font-semibold">
              {s.ol.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        if (s.code) {
          return (
            <div key={i} className="rounded-lg border border-white/10 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-bg-surface border-b border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-pink/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-violet/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan/40" />
              </div>
              <pre className="overflow-x-auto bg-bg-card px-5 py-4 text-[0.8rem] sm:text-[0.85rem] leading-relaxed text-ink-muted font-mono">
                <code>{s.code.text}</code>
              </pre>
            </div>
          );
        }

        if (s.quote) {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-accent-pink pl-5 py-1 italic text-ink-muted text-base sm:text-[1.05rem]"
            >
              {renderInline(s.quote)}
              {s.cite && (
                <footer className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-dim not-italic">
                  — {s.cite}
                </footer>
              )}
            </blockquote>
          );
        }

        if (s.table) {
          return (
            <div key={i} className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-bg-card">
                    {s.table.head.map((h, j) => (
                      <th
                        key={j}
                        className="px-4 py-3 font-display font-semibold text-ink whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, r) => (
                    <tr key={r} className="border-b border-white/5 last:border-b-0">
                      {row.map((cell, c) => (
                        <td key={c} className="px-4 py-3 text-ink-muted align-top">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (s.diagram) {
          const Diagram = diagrams[s.diagram];
          if (!Diagram) return null;
          return (
            <figure
              key={i}
              className="rounded-lg border border-white/10 bg-bg-card px-4 py-6 sm:px-8 sm:py-8"
            >
              <Diagram />
              {s.caption && (
                <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-ink-dim">
                  {s.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (s.callout) {
          return (
            <div
              key={i}
              className="rounded-lg border border-accent-violet/30 bg-bg-panel px-5 py-4"
            >
              {s.callout.title && (
                <p className="font-display font-semibold text-sm uppercase tracking-widest text-accent-pink mb-2">
                  {s.callout.title}
                </p>
              )}
              <p className="text-ink-muted leading-relaxed text-base sm:text-[1.05rem]">
                {renderInline(s.callout.text)}
              </p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
