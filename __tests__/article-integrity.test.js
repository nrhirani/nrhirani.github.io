/**
 * Sanity checks that every article slug in lib/data.js has matching content
 * in lib/articles/index.js, and that all required fields are present.
 * Catches content mismatches before they reach production.
 */

import { articles } from "@/lib/data";
import { articleContent } from "@/lib/articles";

describe("Article content integrity", () => {
  test("every article in data.js has matching content in articleContent", () => {
    articles.forEach(({ slug }) => {
      expect(articleContent[slug]).toBeDefined();
    });
  });

  test("every article in data.js has all required metadata fields", () => {
    articles.forEach((article) => {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.excerpt).toBeTruthy();
      expect(article.date).toBeTruthy();
      expect(article.readTime).toBeTruthy();
    });
  });

  test("every article content has a non-empty sections array", () => {
    articles.forEach(({ slug }) => {
      const content = articleContent[slug];
      if (!content) return; // already caught above
      expect(Array.isArray(content.sections)).toBe(true);
      expect(content.sections.length).toBeGreaterThan(0);
    });
  });

  test("no duplicate article slugs", () => {
    const slugs = articles.map((a) => a.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  test("articleContent has no orphaned entries missing from data.js", () => {
    const knownSlugs = new Set(articles.map((a) => a.slug));
    Object.keys(articleContent).forEach((slug) => {
      expect(knownSlugs.has(slug)).toBe(true);
    });
  });
});
