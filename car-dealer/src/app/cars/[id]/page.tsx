'use client';

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Car } from "../../../types/car";
import { cars as seedCars } from "../../../data/cars";

export default function CarDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 先從本地示範資料找
  const localCar = useMemo(
    () => seedCars.find((c) => c.id === id),
    [id]
  );

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("找不到這台車的編號。");
      return;
    }

    if (localCar) {
      setCar(localCar);
      setLoading(false);
    }

    // 再嘗試從 Firestore 取回最新資料（如果有的話就覆蓋本地的）
    const loadRemote = async () => {
      try {
        const ref = doc(db, "cars", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const d = snap.data() as any;
          const firstImage =
            Array.isArray(d.imageUrls) && d.imageUrls.length > 0
              ? d.imageUrls[0]
              : localCar?.imageUrl ?? "/cars/bmw-3.svg";

          const remoteCar: Car = {
            id: snap.id,
            brand: d.brand ?? localCar?.brand ?? "未命名車輛",
            model: d.model ?? localCar?.model ?? "",
            year:
              typeof d.year === "number"
                ? d.year
                : localCar?.year ?? new Date().getFullYear(),
            price:
              typeof d.price === "number" ? d.price : localCar?.price ?? 0,
            mileage:
              typeof d.mileage === "number"
                ? d.mileage
                : localCar?.mileage ?? 0,
            category: d.category ?? localCar?.category ?? "sedan",
            transmission: d.transmission ?? localCar?.transmission ?? "automatic",
            fuel: d.fuel ?? localCar?.fuel ?? "gasoline",
            imageUrl: firstImage,
            highlight: localCar?.highlight,
          };

          setCar(remoteCar);
          setError(null);
        } else if (!localCar) {
          setError("查無此車輛資料。");
        }
      } catch (err) {
        console.error("載入車輛詳細資料失敗：", err);
        if (!localCar) {
          setError("無法載入車輛詳細資料。");
        }
      } finally {
        setLoading(false);
      }
    };

    loadRemote();
  }, [id, localCar]);

  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">車輛載入中…</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="space-y-4">
        <Link
          href="/cars"
          className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          ← 回到車輛列表
        </Link>
        <p className="text-sm text-red-500">
          {error ?? "找不到這台車的詳細資料。"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/cars"
        className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
      >
        ← 回到車輛列表
      </Link>

      <section className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-black shadow-sm dark:border-zinc-800">
          <div className="relative h-72 w-full md:h-96">
            <Image
              src={car.imageUrl}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 space-y-1 text-white drop-shadow">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                精選車輛
              </p>
              <h1 className="text-2xl font-semibold md:text-3xl">
                {car.brand} {car.model}
              </h1>
              <p className="text-xs text-zinc-200 md:text-sm">
                {car.year} 年出廠 ·{" "}
                {new Intl.NumberFormat("zh-TW").format(car.mileage)} km ·{" "}
                {car.transmission === "automatic" ? "自排" : "手排"} ·{" "}
                {car.fuel === "gasoline"
                  ? "汽油"
                  : car.fuel === "diesel"
                  ? "柴油"
                  : car.fuel === "hybrid"
                  ? "Hybrid"
                  : "電動"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              車輛基本資料
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              如需更完整的車況說明與實車鑑定報告，歡迎直接與我們聯繫。
            </p>
          </header>

          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            NT$ {new Intl.NumberFormat("zh-TW").format(car.price)}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs md:text-sm">
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">出廠年份</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">
                {car.year} 年
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">里程數</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">
                {new Intl.NumberFormat("zh-TW").format(car.mileage)} km
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">變速系統</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">
                {car.transmission === "automatic" ? "自排" : "手排"}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">燃料種類</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">
                {car.fuel === "gasoline"
                  ? "汽油"
                  : car.fuel === "diesel"
                  ? "柴油"
                  : car.fuel === "hybrid"
                  ? "Hybrid"
                  : "電動車"}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">車輛分類</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-50">
                {car.category.toUpperCase()}
              </dd>
            </div>
          </dl>

          <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 md:text-sm">
            <p>
              本車輛已通過基本車況檢查，實際車況與配備以現場實車為準。若需要貸款試算或舊車估價，我們也可以一併為你服務。
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="tel:0956958065"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-400 md:flex-none md:px-6"
            >
              電話洽詢 / 預約賞車
            </a>
            <Link
              href="/sell"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 md:flex-none md:px-6"
            >
              我要估價 / 以車換車
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

