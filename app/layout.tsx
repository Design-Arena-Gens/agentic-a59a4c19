import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Islex - Interaktywne ćwiczenia islandzkiego",
  description:
    "Interaktywne ćwiczenia języka islandzkiego: słownictwo, gramatyka i inteligentne treningi dopasowane do Ciebie.",
  metadataBase: new URL("https://agentic-a59a4c19.vercel.app"),
  openGraph: {
    title: "Islex - Interaktywne ćwiczenia islandzkiego",
    description:
      "Rozwijaj islandzki dzięki interaktywnym zadaniom i planom nauki.",
    url: "https://agentic-a59a4c19.vercel.app",
    siteName: "Islex",
    locale: "pl_PL",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-50`}>{children}</body>
    </html>
  );
}
