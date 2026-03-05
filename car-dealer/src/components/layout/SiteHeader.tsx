'use client';

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/intro", label: "平台介紹" },
  { href: "/cars", label: "我要買車" },
  { href: "/sell", label: "我要賣車" },
  { href: "/loan", label: "貸款試算" },
  { href: "/knowledge", label: "二手車知識" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-sm font-bold text-white">
            川
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">
              向川國際車業 River Car
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              嚴選中古車 | 高價收購 | 專人代辦
            </span>
          </div>
        </Link>

        {/* 桌機版導覽 */}
        <nav className="hidden items-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300 md:flex md:text-sm md:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 手機版漢堡按鈕 */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-xs text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden"
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
        <div className="fixed inset-x-0 top-[4rem] z-40 border-t border-zinc-200 bg-white/95 pb-6 pt-3 text-sm text-zinc-800 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-50 md:hidden">
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


