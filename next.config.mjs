/** @type {import('next').NextConfig} */

// When building for GitHub Pages, the site is served from a sub-path
// (https://<user>.github.io/<repo>), so we need basePath/assetPrefix.
// Locally (npm run dev / npm run build without this flag) the site still
// serves from the root.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "personal-website";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
