export default function LoanPage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Loan
        </p>
        <h1 className="text-2xl font-semibold tracking-tighter text-zinc-50 md:text-3xl">
          貸款試算
        </h1>
        <p className="max-w-2xl text-xs text-zinc-400 md:text-sm">
          簡單輸入車價與頭期款，即可初步試算每月期付款金額，實際條件仍以合作銀行與現場審核為主。
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-zinc-400 shadow-[0_0_24px_rgba(15,23,42,0.9)] backdrop-blur-xl md:text-sm">
        <p>
          （此區之後可實作真實試算工具，現在先保留版位供向川國際預覽版型。）
        </p>
      </section>
    </div>
  );
}

