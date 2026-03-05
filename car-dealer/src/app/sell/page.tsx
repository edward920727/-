export default function SellPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
          Sell
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          我要賣車
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
          想快速又有保障地賣車給向川國際？留下基本車況與聯絡方式，我們的專員會與你聯繫，提供估價與收購建議。
        </p>
      </header>

      <section className="rounded-2xl bg-white p-4 text-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          （此區可以未來接表單 / Line 官方帳號連結，目前先作為版型示意）
        </p>
      </section>
    </div>
  );
}

