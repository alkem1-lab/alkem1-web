import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { GlobalHeader } from "../components/ui/GlobalHeader";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Metadata
export const metadata: Metadata = {
  title: "ALKEM1 | The Glass Box AI",
  description: "Trust is Dead. Verification is Alive. The only AI system with a built-in kill switch and mathematical proof of integrity.",
  keywords: ["AI", "Enterprise AI", "Kill Switch", "XCK", "Verification", "Glass Box"],
  authors: [{ name: "ALKEM1" }],
  openGraph: {
    title: "ALKEM1 | The Glass Box AI",
    description: "Trust is Dead. Verification is Alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${instrumentSerif.variable}
          antialiased
          bg-void
          text-text-body
          selection:bg-phosphor
          selection:text-void
        `}
      >
        <GlobalHeader />
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
