'use client';

import Image from "next/image";
import Link from "next/link";
import type { Car } from "../../types/car";
import { useTheme } from "../../contexts/ThemeContext";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const detailHref = `/cars/${car.id}`;
  const { currentTheme } = useTheme();
  const isLight = currentTheme === "light";

  const cardBase =
    "group flex flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1";
  const cardTheme = isLight
    ? "border border-gray-200 bg-white text-gray-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
    : "border border-slate-700/70 bg-black/40 text-zinc-50 shadow-[0_0_0_1px_rgba(148,163,184,0.35)] ring-1 ring-blue-500/0 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.55)] hover:ring-blue-400/60";

  const titleClass = isLight
    ? "text-base font-semibold tracking-tighter text-gray-900"
    : "text-base font-semibold tracking-tighter text-zinc-50";

  const metaClass = isLight
    ? "text-xs text-gray-500"
    : "text-xs text-zinc-400";

  const priceClass = isLight
    ? "mt-auto text-lg font-semibold tracking-tighter text-blue-600"
    : "mt-auto text-lg font-semibold tracking-tighter text-blue-400";

  const buttonClass = isLight
    ? "mt-1 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white shadow-[0_0_18px_rgba(37,99,235,0.5)] transition hover:bg-blue-500"
    : "mt-1 inline-flex items-center justify-center rounded-full bg-blue-500/90 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-zinc-950 shadow-[0_0_20px_rgba(59,130,246,0.7)] transition hover:bg-blue-400";

  return (
    <article className={`${cardBase} ${cardTheme}`}>
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
          <span className="absolute left-3 top-3 rounded-full bg-blue-500/95 px-2 py-0.5 text-xs font-semibold tracking-[0.12em] text-white shadow-[0_0_18px_rgba(59,130,246,0.9)]">
            精選車
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className={titleClass}>
            {car.brand} {car.model}
          </h3>
          <p className={metaClass}>
            {car.year} ·{" "}
            {new Intl.NumberFormat("zh-TW").format(car.mileage)} km ·{" "}
            {car.transmission === "automatic" ? "自排" : "手排"}
          </p>
        </div>
        <p className={priceClass}>
          NT$ {new Intl.NumberFormat("zh-TW").format(car.price)}
        </p>
        <Link
          href={detailHref}
          className={buttonClass}
        >
          查看詳細資訊
        </Link>
      </div>
    </article>
  );
}

