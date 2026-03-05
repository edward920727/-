import { CarUploadForm } from "@/components/cars/CarUploadForm";
import { AdminCarTable } from "@/components/admin/AdminCarTable";

export default function AdminCarsPage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Inventory
        </p>
        <h2 className="text-lg font-semibold">車輛管理</h2>
        <p className="text-xs text-zinc-400">
          建議在車輛旁直接用手機開啟這個頁面，拍照後立即上傳與建檔，避免事後遺漏。
        </p>
      </header>

      <section>
        <CarUploadForm />
      </section>

      <AdminCarTable />
    </div>
  );
}


