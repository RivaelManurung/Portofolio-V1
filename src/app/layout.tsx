import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClientOverlays } from "@/components/layout/ClientOverlays";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rivael.dev"),
  title: {
    default: "Rivael | Senior Fullstack Developer",
    template: "%s | Rivael Portfolio",
  },
  description: "Senior Fullstack Developer specializing in Laravel, Go, and Next.js. Building clean, scalable digital products.",
  keywords: ["Fullstack Developer", "Laravel", "Golang", "Next.js", "React", "TypeScript", "Portofolio"],
  authors: [{ name: "Rivael" }],
  creator: "Rivael",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rivael.dev",
    title: "Rivael | Senior Fullstack Developer",
    description: "Building clean digital products with thoughtful engineering.",
    siteName: "Rivael Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivael | Senior Fullstack Developer",
    description: "Building clean digital products with thoughtful engineering.",
    creator: "@rivael",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased font-sans`}
    >
      <head>
        {/* Speed up the LCP hero image by warming the Unsplash connection. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full bg-white text-slate-900 overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-neutral-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>
          {/* Inside SmoothScroll so its `m` components resolve the LazyMotion
              feature context (the custom cursor breaks otherwise). */}
          <ClientOverlays />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

