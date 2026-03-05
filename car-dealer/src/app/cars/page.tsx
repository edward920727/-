import { cars } from "../../data/cars";
import { CarCard } from "../../components/cars/CarCard";

const filters = [
  "全部",
  "轎車 Sedan",
  "休旅 SUV",
  "皮卡 / 貨卡",
  "性能 / 跑車",
  "電動 / Hybrid",
];

export default function CarListPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
          Inventory
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl dark:text-zinc-50">
          車輛列表
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
          目前展示中的精選車輛，皆附完整車況鑑定與里程保證。歡迎預約賞車或來電詢問最新優惠。
        </p>
      </header>

      <section className="space-y-4 rounded-2xl bg-white/80 p-4 ring-1 ring-zinc-200 dark:bg-zinc-950/80 dark:ring-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="inline-flex flex-wrap gap-2">
            {filters.map((label, index) => (
              <button
                key={label}
                className={`rounded-full border px-3 py-1 transition ${
                  index === 0
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>排序：</span>
            <select className="rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900">
              <option>價格（由低到高）</option>
              <option>價格（由高到低）</option>
              <option>年份（由新到舊）</option>
              <option>里程數（由少到多）</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </section>
    </div>
  );
}

