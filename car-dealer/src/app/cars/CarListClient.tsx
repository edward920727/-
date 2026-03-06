'use client';

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cars as seedCars } from "../../data/cars";
import { CarCard } from "../../components/cars/CarCard";
import type { Car } from "../../types/car";

type SortOption = "price-asc" | "price-desc" | "year-desc" | "mileage-asc";
type FilterKey = "all" | "sedan" | "suv" | "truck" | "sports" | "ev-hybrid";

const filterDefs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "sedan", label: "轎車 Sedan" },
  { key: "suv", label: "休旅 SUV" },
  { key: "truck", label: "皮卡 / 貨卡" },
  { key: "sports", label: "性能 / 跑車" },
  { key: "ev-hybrid", label: "電動 / Hybrid" },
];

export default function CarListClient() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [search, setSearch] = useState("");
  const [remoteCars, setRemoteCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 從網址列帶入預設搜尋與篩選條件（例如從首頁大圖搜尋過來）
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const type = searchParams.get("type") as FilterKey | null;

    if (q && q !== search) {
      setSearch(q);
    }

    if (type && filterDefs.some((f) => f.key === type) && type !== activeFilter) {
      setActiveFilter(type);
    }
  }, [searchParams, search, activeFilter]);

  useEffect(() => {
    const dbRef = db;
    // 若尚未設定 Firebase（db 為 null），就直接使用本地示範資料
    if (!dbRef) {
      setLoading(false);
      setError("尚未設定 Firebase，僅顯示示範車輛。");
      return;
    }

    const q = query(collection(dbRef, "cars"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs: Car[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data() as any;
          // 將後台建立的車輛資料轉成前台列表可用的型別，缺少欄位先用預設值
          const firstImage =
            Array.isArray(d.imageUrls) && d.imageUrls.length > 0
              ? d.imageUrls[0]
              : "/cars/bmw-3.svg";

          return {
            id: docSnap.id,
            brand: d.brand ?? "未命名車輛",
            model: d.model ?? "",
            year: typeof d.year === "number" ? d.year : new Date().getFullYear(),
            price: typeof d.price === "number" ? d.price : 0,
            mileage: typeof d.mileage === "number" ? d.mileage : 0,
            category: d.category ?? "sedan",
            transmission: d.transmission ?? "automatic",
            fuel: d.fuel ?? "gasoline",
            imageUrl: firstImage,
          };
        });
        setRemoteCars(docs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("讀取 Firestore 車輛失敗：", err);
        setError("無法載入線上車輛列表，僅顯示示範車輛。");
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const allCars = useMemo<Car[]>(() => [...remoteCars, ...seedCars], [remoteCars]);

  const filteredCars = useMemo(() => {
    let result = [...allCars];

    // 搜尋品牌 / 車型
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((car) =>
        `${car.brand} ${car.model}`.toLowerCase().includes(q)
      );
    }

    // 類型篩選
    result = result.filter((car) => {
      switch (activeFilter) {
        case "sedan":
          return car.category === "sedan";
        case "suv":
          return car.category === "suv";
        case "truck":
          return car.category === "truck";
        case "sports":
          return car.category === "sports";
        case "ev-hybrid":
          return car.category === "ev" || car.fuel === "hybrid";
        default:
          return true;
      }
    });

    // 排序
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "year-desc":
          return b.year - a.year;
        case "mileage-asc":
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return result;
  }, [activeFilter, sortBy, search, allCars]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
          Inventory
        </p>
        <h1 className="text-2xl font-semibold tracking-tighter text-zinc-50 md:text-3xl">
          車輛列表
        </h1>
        <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
          目前展示中的精選車輛，皆附完整車況鑑定與里程保證。歡迎預約賞車或來電詢問最新優惠。
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_0_32px_rgba(15,23,42,0.9)]">
        <div className="flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between md:text-sm">
          {/* 篩選標籤 */}
          <div className="inline-flex flex-wrap gap-2">
            {filterDefs.map((f) => {
              const active = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  className={`rounded-full border px-3 py-1.5 transition ${
                    active
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                      : "border-slate-700 text-zinc-400 hover:bg-slate-900"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* 搜尋 + 排序 */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-zinc-500 md:inline">
                搜尋：
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="輸入廠牌或車款，例如：BMW、Model 3"
                className="w-full rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>排序：</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-zinc-100"
              >
                <option value="price-asc">價格（由低到高）</option>
                <option value="price-desc">價格（由高到低）</option>
                <option value="year-desc">年份（由新到舊）</option>
                <option value="mileage-asc">里程數（由少到多）</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && filteredCars.length === 0 ? (
          <p className="col-span-full text-sm text-zinc-500">
            車輛載入中…
          </p>
        ) : filteredCars.length === 0 ? (
          <p className="col-span-full text-sm text-zinc-500">
            找不到符合條件的車輛，請調整搜尋關鍵字或篩選條件。
            {error && <span className="block pt-1 text-xs text-red-400">{error}</span>}
          </p>
        ) : (
          filteredCars.map((car, index) => (
            <div
              key={car.id}
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <CarCard car={car} />
            </div>
          ))
        )}
      </section>
    </div>
  );
}

