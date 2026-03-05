'use client';

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "儀表板" },
  { href: "/admin/cars", label: "車輛管理", badge: "新" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-[calc(100vh-5rem-4rem)] overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 text-zinc-50 shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col md:flex-row">
        {/* 側邊欄 */}
        <aside className="w-full border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-3 backdrop-blur md:w-64 md:border-b-0 md:border-r md:px-6 md:py-8">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Admin
            </p>
            <h1 className="mt-1 text-base font-semibold text-zinc-50">
              向川國際後台管理
            </h1>
            <p className="mt-1 text-[11px] text-zinc-500">
              僅供車行內部人員使用
            </p>
          </div>

          <nav className="space-y-1 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                    active
                      ? "bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-500/50"
                      : "text-zinc-300 hover:bg-zinc-900/70 hover:text-zinc-50"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[11px] text-emerald-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/"
              className="mt-4 inline-flex items-center text-[11px] text-zinc-500 transition hover:text-zinc-200"
            >
              <span className="mr-1">←</span> 回到前台網站
            </Link>
          </nav>
        </aside>

        {/* 內容區 */}
        <main className="flex-1 px-4 py-4 md:px-8 md:py-8">
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/70 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.6)] md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

