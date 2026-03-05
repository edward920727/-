export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Overview
        </p>
        <h2 className="text-lg font-semibold">營運儀表板</h2>
        <p className="text-xs text-zinc-400">
          這裡是向川國際的內部控制台，未來可以擴充成交統計、熱銷車款與業務績效。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-4 ring-1 ring-emerald-500/30">
          <p className="text-xs text-emerald-200">本月新增車輛</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">—</p>
          <p className="mt-1 text-[11px] text-emerald-100/80">
            之後可接 Firestore，以 createdAt 統計本月建立的車輛數。
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-transparent p-4 ring-1 ring-sky-500/30">
          <p className="text-xs text-sky-200">目前在庫數量</p>
          <p className="mt-2 text-2xl font-semibold text-sky-300">—</p>
          <p className="mt-1 text-[11px] text-sky-100/80">
            可依照 status = &quot;in_stock&quot; 即時統計。
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent p-4 ring-1 ring-amber-500/30">
          <p className="text-xs text-amber-200">本月成交台數</p>
          <p className="mt-2 text-2xl font-semibold text-amber-200">—</p>
          <p className="mt-1 text-[11px] text-amber-100/80">
            可依照 status 由在庫切換為 sold 的紀錄推算。
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-zinc-900/80 p-4 ring-1 ring-zinc-800">
        <h3 className="text-sm font-semibold">快速操作建議</h3>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-400">
          <li>先到左側「車輛管理」，用手機在車旁直接拍照上傳並立即建檔。</li>
          <li>賣出後記得將狀態改成「已售出」，方便日後做成交統計。</li>
          <li>若車輛還在整理中，可先標記為「整備中」，避免誤報給前台客戶。</li>
        </ul>
      </section>
    </div>
  );
}

