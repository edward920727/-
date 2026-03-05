export default function LoanPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
          Loan
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          貸款試算
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
          簡單輸入車價與頭期款，即可初步試算每月期付款金額，實際條件仍以合作銀行與現場審核為主。
        </p>
      </header>

      <section className="rounded-2xl bg-white p-4 text-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          （此區之後可實作真實試算工具，現在先保留版位供向川國際預覽版型。）
        </p>
      </section>
    </div>
  );
}

