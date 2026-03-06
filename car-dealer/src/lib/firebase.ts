import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import {
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import {
  getStorage,
  type FirebaseStorage,
} from "firebase/storage";

// 使用環境變數設定 Firebase（建議在 .env.local 中設定）
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// 避免在開發環境 hot reload 時重複初始化
function createFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfig.apiKey) {
    // 在沒有設定 Firebase 環境變數時，不要讓 build 壞掉，僅在執行時關閉雲端功能
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Firebase 環境變數未設定，線上資料功能將停用（僅使用本地示範資料）。"
      );
    }
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}

const app = createFirebaseApp();

// Analytics 僅在瀏覽器端可用，避免在 SSR / Node 環境觸發錯誤
let analytics: Analytics | undefined;
if (typeof window !== "undefined" && app) {
  try {
    analytics = getAnalytics(app);
  } catch {
    // 在部分環境（如隱私模式）可能無法啟用 Analytics，忽略錯誤即可
  }
}

export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;
export { analytics };
export default app;


