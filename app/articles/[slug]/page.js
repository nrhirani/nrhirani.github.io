import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles, profile } from "@/lib/data";
import { articleContent } from "@/lib/articles";
import ArticleBody from "@/components/ArticleBody";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ReadingProgress from "@/components/ReadingProgress";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const meta = articles.find((a) => a.slug === params.slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — ${profile.name}`,
    description: meta.excerpt,
  };
}

export default function ArticlePage({ params }) {
  const meta = articles.find((a) => a.slug === params.slug);
  const content = articleContent[params.slug];

  if (!meta || !content) {
    notFound();
  }

  const otherArticles = articles.filter((a) => a.slug !== params.slug);

  return (
    <main>
      <ReadingProgress />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-3">
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
          </Link>

          <Link
            href="/#articles"
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-ink-muted hover:text-accent-pink transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Articles</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-white/5 bg-bg">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[40rem] h-[40rem] rounded-full bg-accent-gradient blur-[140px] opacity-[0.15] pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 sm:pt-24 pb-12">
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-accent-cyan uppercase mb-6">
            Article
          </p>

          <h1 className="font-display font-bold text-3xl sm:text-5xl leading-tight mb-6 tracking-tight">
            {meta.title}
          </h1>

          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest mb-8">
            <span className="px-3 py-1 rounded-full bg-accent-pink/10 text-accent-pink border border-accent-pink/20">
              {meta.date}
            </span>
            <span className="text-ink-dim">{meta.readTime}</span>
          </div>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            {meta.excerpt}
          </p>
        </div>
      </div>

      <article className="px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <ArticleBody sections={content.sections} />

          <div className="mt-16 pt-10 border-t border-white/10">
            <h2 className="heading-accent heading-accent-left font-display font-bold text-2xl sm:text-3xl mb-10">
              More Articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col justify-between gap-4 rounded-xl border border-white/5 bg-bg-card p-6 transition-colors hover:border-accent-pink/40"
                >
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink-dim mb-3">
                      <span>{article.date}</span>
                      <span className="text-accent-pink">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-accent-pink transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-cyan opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    Read article
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
