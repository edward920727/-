import { Suspense } from "react";
import CarListClient from "./CarListClient";

export default function CarListPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-sm text-zinc-500 dark:text-zinc-400">
          車輛列表載入中…
        </div>
      }
    >
      <CarListClient />
    </Suspense>
  );
}

