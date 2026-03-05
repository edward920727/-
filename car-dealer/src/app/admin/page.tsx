export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Overview
        </p>
        <h2 className="text-lg font-semibold">營運儀表板</h2>
        <p className="text-xs text-zinc-400">
          這裡是車行內部使用的後台首頁，可以之後擴充成統計數據與簡易報表。
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
          <p className="text-xs text-zinc-400">本月新增車輛</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-400">—</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            之後可以接 Firestore 即時計算。
          </p>
        </div>
        <div className="rounded-2xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
          <p className="text-xs text-zinc-400">在庫車輛數</p>
          <p className="mt-2 text-2xl font-semibold text-sky-400">—</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            可依照 status = &quot;in_stock&quot; 統計。
          </p>
        </div>
        <div className="rounded-2xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
          <p className="text-xs text-zinc-400">本月成交台數</p>
          <p className="mt-2 text-2xl font-semibold text-amber-300">—</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            可依照 status = &quot;sold&quot; 統計。
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
        <h3 className="text-sm font-semibold">快速操作建議</h3>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-400">
          <li>先到左側「車輛管理」頁面，直接用手機拍照上傳新到港車輛。</li>
          <li>之後可以在這裡新增：成交紀錄、每月銷售統計、熱門車款排行…。</li>
          <li>若需要區分多位業務，可再增加使用者帳號與權限系統。</li>
        </ul>
      </section>
    </div>
  );
}

