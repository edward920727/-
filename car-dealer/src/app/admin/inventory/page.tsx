import { AdminCarTable } from "@/components/admin/AdminCarTable";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6 text-sm text-zinc-100">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Inventory
        </p>
        <h2 className="text-lg font-semibold tracking-tighter text-zinc-50">
          目前車輛清單
        </h2>
        <p className="text-xs text-zinc-400">
          這裡會即時顯示後台車輛資料庫的在庫、預訂與已售出狀態，方便快速檢視與調整。
        </p>
      </header>

      <AdminCarTable />
    </div>
  );
}

