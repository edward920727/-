'use client';

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cars } from "../data/cars";
import { CarCard } from "../components/cars/CarCard";
import { navLinks } from "../data/navLinks";

export default function Home() {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement | null>(null);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [keyword, setKeyword] = useState("");

  const featuredCars = cars.filter((car) => car.highlight);

  const brandOptions = useMemo(
    () => Array.from(new Set(cars.map((car) => car.brand))).sort(),
    []
  );

  const handleNext = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({ left: 260, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({ left: -260, behavior: "smooth" });
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (selectedType && selectedType !== "all") {
      params.set("type", selectedType);
    }

    const parts: string[] = [];
    if (selectedBrand) parts.push(selectedBrand);
    if (keyword.trim()) parts.push(keyword.trim());

    if (parts.length > 0) {
      params.set("q", parts.join(" "));
    }

    const query = params.toString();
    router.push(query ? `/cars?${query}` : "/cars");
  };

  const sectionMotionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  } as const;

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  return (
    <div className="space-y-10">
      <AnimatePresence>
        {/* 大圖 Banner */}
        <motion.section
          key="hero"
          className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-white shadow-[0_0_40px_rgba(15,23,42,0.9)]"
          {...sectionMotionProps}
        >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="向川國際車業 Hero"
            fill
            priority
            loading="eager"
            className="hero-zoom image-stagger object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="hero-smoke" />
        </div>
        <div className="relative px-6 py-10 md:px-16 md:py-20 lg:px-20 lg:py-24">
          <p className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-200 ring-1 ring-emerald-400/40">
            向川國際車業 River Car · 嚴選中古車專門
          </p>
          <h1 className="mt-6 max-w-lg text-balance text-3xl font-extrabold tracking-tighter text-white drop-shadow-[0_14px_40px_rgba(0,0,0,0.9)] md:text-4xl lg:text-5xl">
            為你找到下一台最對味的車，
            <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
              從向川國際開始
            </span>
          </h1>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-zinc-300 md:mt-6 md:max-w-lg md:text-sm">
            專營嚴選中古車買賣、代客尋車與高價收購，每一台車皆實車實價、公開車況，
            讓你在預算內找到最適合自己的座駕。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/cars"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold tracking-[0.16em] text-zinc-950 shadow-[0_0_24px_rgba(16,185,129,0.8)] transition hover:bg-emerald-400"
              >
                瀏覽全部車款
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="tel:0956958065"
                className="inline-flex items-center justify-center rounded-full border border-zinc-500/60 bg-black/40 px-5 py-2 text-sm font-medium tracking-[0.16em] text-zinc-50 transition hover:bg-zinc-900/70"
              >
                立即來電預約賞車
              </a>
            </motion.div>
          </div>
          {/* 大圖中間的搜尋車輛區塊（加強視覺重點） */}
          <div className="mt-14 flex justify-center md:mt-16">
            <form
              onSubmit={handleHeroSearch}
              className="w-full max-w-4xl rounded-none bg-black/75 px-4 py-4 text-xs shadow-[0_0_60px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400/60 backdrop-blur-2xl md:flex md:items-end md:gap-4 md:rounded-[999px] md:px-5 md:text-sm"
            >
              <div className="hidden pr-3 text-sm font-semibold text-emerald-300 md:block md:text-base">
                搜尋車輛
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-medium text-zinc-300">
                  品牌
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                >
                  <option value="">不限品牌</option>
                  {brandOptions.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 flex-1 md:mt-0">
                <label className="mb-1 block text-[11px] font-medium text-zinc-300">
                  車型
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                >
                  <option value="all">全部車型</option>
                  <option value="sedan">轎車 Sedan</option>
                  <option value="suv">休旅 SUV</option>
                  <option value="truck">皮卡 / 貨卡</option>
                  <option value="sports">性能 / 跑車</option>
                  <option value="ev-hybrid">電動 / Hybrid</option>
                </select>
              </div>

              <div className="mt-3 flex-[1.6] md:mt-0">
                <label className="mb-1 block text-[11px] font-medium text-zinc-300">
                  關鍵字
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="輸入車款、年分或其他關鍵字"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
                />
              </div>

              <div className="mt-3 flex w-full justify-end md:mt-0 md:w-auto">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-zinc-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 md:w-auto"
                >
                  搜尋車輛
                </button>
              </div>
            </form>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 text-[11px] text-zinc-400 md:mt-16 md:text-xs">
            <div>
              <dt className="text-sm font-semibold tracking-tighter text-zinc-100 md:text-base">
                120+
              </dt>
              <dd className="mt-0.5">項專業檢查</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold tracking-tighter text-zinc-100 md:text-base">
                2 年
              </dt>
              <dd className="mt-0.5">延長保固方案</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold tracking-tighter text-zinc-100 md:text-base">
                7 天
              </dt>
              <dd className="mt-0.5">猶豫期保障</dd>
            </div>
          </dl>
        </div>
        </motion.section>

        {/* 橫向滑動車輛列表 */}
        <motion.section
          key="featured"
          className="space-y-3"
          {...sectionMotionProps}
        >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tighter text-zinc-50">
            精選車款
          </h2>
          <Link
            href="/cars"
            className="text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-300"
          >
            查看全部車輛
          </Link>
        </div>
        <div className="relative">
          <motion.div
            ref={listRef}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                variants={cardVariants}
                className="w-72 flex-shrink-0 md:w-80"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/90 text-xs text-zinc-200 shadow-md ring-1 ring-slate-700/80 hover:bg-slate-800 md:flex"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/90 text-xs text-zinc-200 shadow-md ring-1 ring-slate-700/80 hover:bg-slate-800 md:flex"
          >
            ▶
          </button>
        </div>
        </motion.section>

        <motion.section
          key="trust"
          className="space-y-4"
          {...sectionMotionProps}
        >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tighter text-zinc-50">
            向川國際為何值得信任？
          </h2>
          <Link
            href="/intro"
            className="text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-300"
          >
            了解平台理念
          </Link>
        </div>
        <div className="grid gap-3 text-xs md:grid-cols-3 md:text-sm">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
            <p className="font-medium tracking-tighter text-zinc-50">
              實車實價，絕不灌水
            </p>
            <p className="mt-1 text-zinc-400">
              刊登車輛皆為真實在庫，價格同步現場，避免車到現場才被調高或說已售出。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
            <p className="font-medium tracking-tighter text-zinc-50">
              多重審核與車況說明
            </p>
            <p className="mt-1 text-zinc-400">
              比照大型平台的審核流程，未來可補上第三方鑑定與完整車況報告，資訊透明。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
            <p className="font-medium tracking-tighter text-zinc-50">
              買賣雙向專人服務
            </p>
            <p className="mt-1 text-zinc-400">
              不只協助你買車，也提供代售與收購，協助你用合理價格賣出現有愛車。
            </p>
          </div>
        </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

