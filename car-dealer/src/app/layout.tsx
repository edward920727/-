import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "向川國際車業｜嚴選中古車與專業收購";
const siteDescription =
  "向川國際車業專營嚴選中古車買賣與高價收購，以透明車況與貼心服務陪你找到最適合的一台車。";
const siteUrl = "https://river-car.tw"; // 上線時請依實際網域調整

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "向川國際車業",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "向川國際車業",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-default.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-slate-950 text-zinc-100">
          <SiteHeader />
          <main className="flex-1 pt-16 md:pt-20">
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
              {children}
            </div>
          </main>
          <SiteFooter />
          {/* 全站固定的 LINE 客服按鈕（請將 href 換成實際官方 LINE 連結） */}
          <a
            href="https://line.me"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white shadow-lg ring-2 ring-emerald-300 transition hover:bg-emerald-400 md:h-14 md:w-14"
          >
            LINE
          </a>
        </div>
      </body>
    </html>
  );
}


