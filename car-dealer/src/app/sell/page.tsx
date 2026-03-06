export default function SellPage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-400">
          Sell
        </p>
        <h1 className="text-2xl font-semibold tracking-tighter text-zinc-50 md:text-3xl">
          我要賣車
        </h1>
        <p className="max-w-2xl text-xs text-zinc-400 md:text-sm">
          想快速又有保障地賣車給向川國際？留下基本車況與聯絡方式，我們的專員會與你聯繫，提供估價與收購建議。
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-zinc-400 shadow-[0_0_24px_rgba(15,23,42,0.9)] backdrop-blur-xl md:text-sm">
        <p>
          （此區可以未來接表單 / Line 官方帳號連結，目前先作為版型示意）
        </p>
      </section>
    </div>
  );
}

