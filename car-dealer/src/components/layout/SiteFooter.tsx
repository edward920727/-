export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/90 py-6 text-xs text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="text-zinc-400">
            © {new Date().getFullYear()} 向川國際車業. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-3 text-[11px] text-zinc-500">
            <span>營業時間：10:00 - 20:00（採預約制）</span>
            <span>電話：請依實際門市資訊更新</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            社群與聯絡
          </span>
          <div className="flex gap-2">
            <a
              href="https://line.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-blue-500/90 px-3 py-1 text-[11px] font-medium text-white shadow-[0_0_18px_rgba(59,130,246,0.7)] transition hover:bg-blue-400/90"
            >
              <span>LINE</span>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-medium text-white shadow-sm transition hover:bg-blue-500/90"
            >
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 px-3 py-1 text-[11px] font-medium text-white shadow-sm transition hover:brightness-110"
            >
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

