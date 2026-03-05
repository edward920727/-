import Link from "next/link";
import { cars } from "../data/cars";
import { CarCard } from "../components/cars/CarCard";

export default function Home() {
  const featuredCars = cars.filter((car) => car.highlight);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-center">
        <div className="space-y-5">
          <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-800/60">
            認證中古車 · 全車系專業保固
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl dark:text-zinc-50">
            找下一台理想座駕，
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              從這裡開始
            </span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
            每一台車皆經過多重嚴格檢查，提供完整的車況報告與保固方案。不論是日常通勤、
            家庭休旅還是熱血跑車，我們都能為你找到最適合的選擇。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              瀏覽全部車款
            </Link>
            <button className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">
              預約賞車 / 試駕
            </button>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-xs text-zinc-600 dark:text-zinc-400 md:text-sm">
            <div>
              <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                120+
              </dt>
              <dd>項專業檢查</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                2 年
              </dt>
              <dd>延長保固方案</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                7 天
              </dt>
              <dd>猶豫期保障</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky-500/10 via-emerald-500/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-900/90 p-4 text-zinc-100 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-medium text-emerald-300">
              今日精選車款
            </p>
            <div className="mt-3 grid gap-3">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            熱門車款分類
          </h2>
          <Link
            href="/cars"
            className="text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-300"
          >
            查看全部車輛
          </Link>
        </div>
        <div className="grid gap-3 text-xs md:grid-cols-4 md:text-sm">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="font-medium">通勤省油車</p>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              入門價格、低油耗，適合每日通勤。
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="font-medium">家庭休旅 SUV</p>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              大空間、高安全等級，家庭用車首選。
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="font-medium">電動 / Hybrid</p>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              兼具環保與性能的新能源車款。
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
            <p className="font-medium">性能 / 跑車</p>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              熱血駕馭體驗，高性能車款嚴選。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

