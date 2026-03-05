"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  type UploadTask,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";

interface UploadState {
  isUploading: boolean;
  progress: number; // 0 - 100
  error?: string;
  success?: string;
}

export function CarUploadForm() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    setFiles(selected);
    setUploadState((prev) => ({ ...prev, progress: 0, error: undefined, success: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadState({ isUploading: true, progress: 0, error: undefined, success: undefined });

    if (!brand.trim() || !price.trim()) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: "請輸入廠牌與價格。",
      });
      return;
    }

    if (files.length === 0) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: "請至少選擇一張車輛照片。",
      });
      return;
    }

    try {
      // 1. 先將所有圖片上傳到 Firebase Storage
      const downloadUrls: string[] = [];
      const totalFiles = files.length;

      const uploadTasks: UploadTask[] = files.map((file, index) => {
        const fileName = `${Date.now()}-${index}-${file.name}`;
        const storageRef = ref(storage, `cars/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
          const fileProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // 粗略換算成整體進度（多張圖平均）
          setUploadState((prev) => {
            const baseProgress = (index / totalFiles) * 100;
            const currentTotalProgress =
              baseProgress + fileProgress / totalFiles;
            return {
              ...prev,
              progress: Math.min(100, Math.round(currentTotalProgress)),
            };
          });
        });

        return uploadTask;
      });

      // 等待所有檔案上傳完成並取得 URL
      const uploadResults = await Promise.all(
        uploadTasks.map(
          (task) =>
            new Promise<string>((resolve, reject) => {
              task.on(
                "state_changed",
                undefined,
                (error) => reject(error),
                async () => {
                  try {
                    const url = await getDownloadURL(task.snapshot.ref);
                    resolve(url);
                  } catch (error) {
                    reject(error);
                  }
                }
              );
            })
        )
      );

      downloadUrls.push(...uploadResults);

      // 2. 將車輛資訊與圖片 URL 存入 Firestore 的 cars 集合
      await addDoc(collection(db, "cars"), {
        brand: brand.trim(),
        price: Number(price.replace(/,/g, "")) || 0,
        description: description.trim(),
        imageUrls: downloadUrls,
        status: "in_stock",
        createdAt: serverTimestamp(),
      });

      setUploadState({
        isUploading: false,
        progress: 100,
        success: "上傳完成！車輛已建立。",
      });

      // 清空表單
      setBrand("");
      setPrice("");
      setDescription("");
      setFiles([]);
    } catch (error) {
      console.error("上傳或寫入 Firestore 發生錯誤：", error);
      let message = "上傳失敗，請稍後再試一次。";
      if (error instanceof Error && error.message.includes("Missing Firebase config")) {
        message = "Firebase 設定有問題，請確認 .env.local 是否已正確設定並重啟專案。";
      }
      setUploadState({
        isUploading: false,
        progress: 0,
        error: message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800"
    >
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        新增車輛（手機拍照 / 相簿上傳）
      </h2>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
          廠牌
        </label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="例如：BMW 320i"
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
          價格（NT$）
        </label>
        <input
          type="number"
          inputMode="numeric"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="例如：1680000"
          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
          描述 / 備註
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="例：車況良好、保養紀錄完整、無重大事故…"
          className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500/40 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
          車輛照片（可多張）
        </label>

        {/* 用 button + 隱藏 input，手機上比較好點 */}
        <label className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-emerald-400 bg-emerald-50 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60">
          ➊ 點這裡拍照或選擇相簿（支援多張）
          <input
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {files.length > 0 && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            已選擇 {files.length} 張照片
          </p>
        )}
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
          小撇步：在車旁直接點擊上方按鈕，用手機拍照，上傳時保持網路連線穩定即可。
        </p>
      </div>

      {uploadState.isUploading && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-600 dark:text-zinc-300">
              上傳中…
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-300">
              {uploadState.progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-[width]"
              style={{ width: `${uploadState.progress}%` }}
            />
          </div>
        </div>
      )}

      {uploadState.error && (
        <p className="text-xs text-red-500">{uploadState.error}</p>
      )}
      {uploadState.success && (
        <p className="text-xs text-emerald-600 dark:text-emerald-300">
          {uploadState.success}
        </p>
      )}

      <button
        type="submit"
        disabled={uploadState.isUploading}
        className="flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {uploadState.isUploading ? "上傳中…" : "➋ 上傳並建立車輛"}
      </button>

      <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
        建議在展間現場：先把車開到光線好的地方 → 拍攝外觀、內裝、里程表 →
        直接在此表單上傳與建檔，避免事後補資料遺漏。
      </p>
    </form>
  );
}

