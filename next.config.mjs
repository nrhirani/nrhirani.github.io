/** @type {import('next').NextConfig} */

// Served at the root of a GitHub user/org page (https://nrhirani.github.io/),
// from a repo literally named "nrhirani.github.io" — no basePath needed.
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
