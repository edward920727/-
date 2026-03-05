export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 py-6 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-black/60 dark:text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} City Drive Motors. All rights reserved.</p>
        <p className="flex flex-wrap gap-3">
          <span>營業時間：10:00 - 20:00（每週一公休）</span>
          <span>電話：02-1234-5678</span>
        </p>
      </div>
    </footer>
  );
}

