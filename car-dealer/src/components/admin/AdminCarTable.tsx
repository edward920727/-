"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type CarStatus = "in_stock" | "reserved" | "sold";

interface AdminCar {
  id: string;
  brand: string;
  price: number;
  status: CarStatus;
  createdAt?: Date | null;
}

const statusLabel: Record<CarStatus, string> = {
  in_stock: "在庫",
  reserved: "已預訂",
  sold: "已售出",
};

const statusBadgeClass: Record<CarStatus, string> = {
  in_stock:
    "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40",
  reserved:
    "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/40",
  sold: "bg-zinc-500/20 text-zinc-200 ring-1 ring-zinc-400/40",
};

export function AdminCarTable() {
  const [cars, setCars] = useState<AdminCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data: AdminCar[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data() as any;
          return {
            id: docSnap.id,
            brand: d.brand ?? "",
            price: typeof d.price === "number" ? d.price : 0,
            status: (d.status as CarStatus) ?? "in_stock",
            createdAt: d.createdAt?.toDate?.() ?? null,
          };
        });
        setCars(data);
        setLoading(false);
        setError(undefined);
      },
      (err) => {
        console.error("載入車輛清單失敗：", err);
        setError("無法載入車輛清單，請稍後再試一次。");
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const handleChangeStatus = async (id: string, status: CarStatus) => {
    try {
      setUpdatingId(id);
      await updateDoc(doc(db, "cars", id), { status });
    } catch (err) {
      console.error("更新車輛狀態失敗：", err);
      setError("更新車輛狀態失敗，請稍後再試。");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="space-y-3 rounded-2xl bg-zinc-900/60 p-4 ring-1 ring-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-50">
          目前車輛清單
        </h3>
        <p className="text-[11px] text-zinc-400">
          共 {cars.length} 台（依建立時間排序）
        </p>
      </div>

      {loading && (
        <p className="text-xs text-zinc-400">讀取中…</p>
      )}
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

      {!loading && cars.length === 0 && (
        <p className="text-xs text-zinc-400">
          目前尚未有任何車輛資料，請先在上方使用「新增車輛」表單建立一筆。
        </p>
      )}

      {cars.length > 0 && (
        <div className="flex flex-col gap-2 text-xs">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex items-center justify-between gap-2 rounded-xl bg-zinc-900 px-3 py-2 ring-1 ring-zinc-800"
            >
              <div className="flex flex-1 flex-col">
                <p className="font-medium text-zinc-50">
                  {car.brand || "未命名車輛"}
                </p>
                <p className="text-[11px] text-zinc-400">
                  NT$ {new Intl.NumberFormat("zh-TW").format(car.price)}
                  {car.createdAt && (
                    <>
                      {" "}
                      · 建立於{" "}
                      {car.createdAt.toLocaleDateString("zh-TW")}
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${statusBadgeClass[car.status]}`}
                >
                  {statusLabel[car.status]}
                </span>
                <select
                  value={car.status}
                  onChange={(e) =>
                    handleChangeStatus(
                      car.id,
                      e.target.value as CarStatus
                    )
                  }
                  disabled={updatingId === car.id}
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-100"
                >
                  <option value="in_stock">在庫</option>
                  <option value="reserved">已預訂</option>
                  <option value="sold">已售出</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

