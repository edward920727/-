import Image from "next/image";
import Link from "next/link";
import type { Car } from "../../types/car";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const detailHref = `/cars/${car.id}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-black/40 shadow-[0_0_0_1px_rgba(148,163,184,0.35)] ring-1 ring-emerald-500/0 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] hover:ring-emerald-400/60">
      <div className="relative h-44 w-full overflow-hidden bg-zinc-900/80">
        <Image
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          fill
          loading="lazy"
          className="image-stagger object-cover transition duration-600 group-hover:scale-105 group-hover:opacity-95"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {car.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500/95 px-2 py-0.5 text-xs font-semibold tracking-[0.12em] text-white shadow-[0_0_18px_rgba(52,211,153,0.9)]">
            精選車
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold tracking-tighter text-zinc-50">
            {car.brand} {car.model}
          </h3>
          <p className="text-xs text-zinc-400">
            {car.year} ·{" "}
            {new Intl.NumberFormat("zh-TW").format(car.mileage)} km ·{" "}
            {car.transmission === "automatic" ? "自排" : "手排"}
          </p>
        </div>
        <p className="mt-auto text-lg font-semibold tracking-tighter text-emerald-400">
          NT$ {new Intl.NumberFormat("zh-TW").format(car.price)}
        </p>
        <Link
          href={detailHref}
          className="mt-1 inline-flex items-center justify-center rounded-full bg-emerald-500/90 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.7)] transition hover:bg-emerald-400"
        >
          查看詳細資訊
        </Link>
      </div>
    </article>
  );
}

