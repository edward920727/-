import type { Car } from "../../types/car";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
        {/* 實際專案可以改成 next/image 搭配真實圖片 */}
        <div className="flex h-full items-center justify-center text-sm text-zinc-400">
          車輛圖片預留區（{car.brand} {car.model}）
        </div>
        {car.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white shadow">
            精選車
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {car.brand} {car.model}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {car.year} ·{" "}
            {new Intl.NumberFormat("zh-TW").format(car.mileage)} km ·{" "}
            {car.transmission === "automatic" ? "自排" : "手排"}
          </p>
        </div>
        <p className="mt-auto text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          NT$ {new Intl.NumberFormat("zh-TW").format(car.price)}
        </p>
        <button className="mt-1 inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
          查看詳細資訊
        </button>
      </div>
    </article>
  );
}

