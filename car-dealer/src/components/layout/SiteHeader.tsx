'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "../../data/navLinks";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="向川國際車業 Logo"
            className="h-10 w-10 flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tighter text-white">
              向川國際車業
            </span>
            <span className="text-xs text-zinc-300">
              嚴選中古車 | 高價收購 | 專人代辦
            </span>
          </div>
        </Link>

        {/* 桌機版導覽 */}
        <nav className="hidden items-center gap-3 text-xs font-medium text-zinc-100 md:flex md:text-sm md:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 uppercase tracking-[0.16em] text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-2 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-white/20"
          >
            後台管理
          </Link>
        </nav>

        {/* 手機版漢堡按鈕 */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs text-zinc-100 shadow-sm transition hover:bg-white/10 md:hidden"
          aria-label="開啟主選單"
        >
          <span className="sr-only">開啟主選單</span>
          <span className="space-y-1">
            <span className="block h-[2px] w-4 rounded-full bg-current" />
            <span className="block h-[2px] w-4 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {/* 手機版全螢幕選單 */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[4rem] z-50 border-t border-zinc-200 bg-white/95 pb-6 pt-3 text-sm text-zinc-800 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-50 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              後台管理（僅內部人員）
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


