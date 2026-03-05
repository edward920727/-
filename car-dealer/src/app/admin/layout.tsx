import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-5rem-4rem)] rounded-2xl bg-zinc-950 text-zinc-50 shadow-inner">
      <div className="flex h-full flex-col md:flex-row">
        {/* 側邊欄 */}
        <aside className="w-full border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 md:w-60 md:border-b-0 md:border-r md:px-5 md:py-6">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Admin
            </p>
            <h1 className="mt-1 text-sm font-semibold text-zinc-100">
              後台管理系統
            </h1>
            <p className="mt-1 text-[11px] text-zinc-500">
              僅供車行內部人員使用
            </p>
          </div>

          <nav className="space-y-1 text-sm">
            <Link
              href="/admin"
              className="flex items-center justify-between rounded-xl bg-zinc-900 px-3 py-2 text-zinc-50"
            >
              <span>儀表板</span>
            </Link>
            <Link
              href="/admin/cars"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-zinc-300 hover:bg-zinc-900"
            >
              <span>車輛管理</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-300">
                新
              </span>
            </Link>
            <Link
              href="/"
              className="mt-4 inline-flex text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              ← 回到前台網站
            </Link>
          </nav>
        </aside>

        {/* 內容區 */}
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

