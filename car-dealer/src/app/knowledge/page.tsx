export default function KnowledgePage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Knowledge
        </p>
        <h1 className="text-2xl font-semibold tracking-tighter text-zinc-50 md:text-3xl">
          二手車知識
        </h1>
        <p className="max-w-2xl text-xs text-zinc-400 md:text-sm">
          向川國際會在這裡分享選車觀念、檢查重點與交易流程，讓第一次買中古車的客戶也能看得懂、問得安心。
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 text-xs text-zinc-400 shadow-[0_0_24px_rgba(15,23,42,0.9)] backdrop-blur-xl md:text-sm">
        <p>
          （未來可放教學文章、影片或常見問答，現在先作為內容區塊的佈局示意。）
        </p>
      </section>
    </div>
  );
}

