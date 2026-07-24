import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://antsilks.vercel.app"),
  title: "antsilk — drop-in security middleware for Python ASGI apps",
  description:
    "Two-line install. Zero runtime dependencies. Rate limiting, IP threat-intel, and SQLi / XSS / path-traversal scanning for FastAPI, Starlette & Litestar — with a live ledger of everything it blocks.",
  keywords: [
    "python",
    "fastapi",
    "asgi",
    "waf",
    "security middleware",
    "rate limiting",
    "sql injection",
    "xss",
  ],
  authors: [{ name: "Brian Chen" }],
  openGraph: {
    title: "antsilk",
    description:
      "Drop-in security middleware for Python ASGI apps. < 1ms p99 overhead, zero runtime dependencies, a live ledger of every blocked request.",
    type: "website",
    url: "https://antsilks.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "antsilk",
    description:
      "Drop-in security middleware for Python ASGI apps. Zero runtime dependencies.",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
