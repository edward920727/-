export default function IntroPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
          Platform
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          平台介紹
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
          向川國際車業 River Car 以透明、專業、實車實價為核心，提供買賣雙方都
          能放心使用的中古車平台服務。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 text-sm">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            審核篩選機制
          </h2>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            比照大型平台做多重審核，確保每一台車皆為實車實價，並有清楚的車況
            說明與資料來源。
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            透明公開車況
          </h2>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            堅持不隱瞞事故與重要維修紀錄，未來可整合檢驗報告與第三方鑑定，讓
            車況資訊一目了然。
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            買賣雙方兼顧
          </h2>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            不只服務買方，也協助賣車客戶提供代售、代賣、收購等多元方案，找到
            對雙方都合理的成交價格。
          </p>
        </div>
      </section>
    </div>
  );
}

