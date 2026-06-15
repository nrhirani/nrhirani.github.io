import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Nishit Hirani — VP Engineering | AI Systems & Leadership",
  description:
    "AI engineer and engineering leader focused on building intelligent systems from design to production. LLM applications, system architecture, and high-performing engineering teams.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink font-mono antialiased">{children}</body>
    </html>
  );
}
