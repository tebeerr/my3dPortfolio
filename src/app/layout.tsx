import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/layout/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { Analytics } from "@vercel/analytics/next";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070a10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ramziteber.vercel.app"),
  title: {
    default: "Ramzi Teber — Full-Stack Developer & Cybersecurity Engineer",
    template: "%s · Ramzi Teber",
  },
  description:
    "Ramzi Teber (RAMSEES) — Engineering student in IT Systems Security & Networks at TEK-UP, full-stack developer at KARMA SOLUTION. Building secure, scalable systems with Angular, Python, AI and cloud.",
  keywords: [
    "Ramzi Teber",
    "RAMSEES",
    "Cybersecurity Engineer",
    "SOC Analyst",
    "Full-Stack Developer",
    "Angular",
    "Python",
    "Tunis",
    "Tunisia",
    "TEK-UP",
  ],
  authors: [{ name: "Ramzi Teber", url: "https://github.com/tebeerr" }],
  creator: "Ramzi Teber",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ramziteber.vercel.app",
    title: "Ramzi Teber — Full-Stack Developer & Cybersecurity Engineer",
    description:
      "Building secure, scalable systems. Angular · Python · AI · Cloud · Networking.",
    siteName: "Ramzi Teber Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramzi Teber — Full-Stack Developer & Cybersecurity Engineer",
    description:
      "Building secure, scalable systems. Angular · Python · AI · Cloud · Networking.",
  },
  icons: {
    icon: "/ramsees_logo.png",
    apple: "/ramsees_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink noise-overlay">
        <SmoothScrollProvider>
          <Cursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
