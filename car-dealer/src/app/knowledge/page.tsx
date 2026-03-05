export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
          Knowledge
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          二手車知識
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
          向川國際會在這裡分享選車觀念、檢查重點與交易流程，讓第一次買中古車的客戶也能看得懂、問得安心。
        </p>
      </header>

      <section className="rounded-2xl bg-white p-4 text-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          （未來可放教學文章、影片或常見問答，現在先作為內容區塊的佈局示意。）
        </p>
      </section>
    </div>
  );
}

