import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/data";

export default function Articles() {
  return (
    <section id="articles" className="bg-bg-surface py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-accent text-center font-display font-bold text-4xl sm:text-5xl mb-20">
          Articles &amp; Writing
        </h2>

        <div className="space-y-10">
          {articles.map((article) => (
            <article
              key={article.title}
              className="border-b border-white/10 pb-10 last:border-b-0 last:pb-0 group"
            >
              <Link href={`/articles/${article.slug}`} className="block">
                <h3 className="font-display font-semibold text-xl sm:text-2xl mb-3 group-hover:text-accent-pink transition-colors cursor-pointer flex items-center gap-2">
                  {article.title}
                  <ArrowRight
                    size={18}
                    className="shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-pink"
                  />
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-dim">
                  <span>{article.date}</span>
                  <span className="text-accent-pink">•</span>
                  <span>{article.readTime}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
