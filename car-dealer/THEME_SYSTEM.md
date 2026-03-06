# 滾動觸發主題轉換系統

這是一個類似保時捷官網的滾動觸發主題轉換系統，當使用者滾動到特定區塊時，頁面背景會在黑色（#000000）與白色（#FFFFFF）之間平滑切換。

## 功能特色

- ✅ 使用 Framer Motion 處理滾動偵測與顏色漸變
- ✅ 可重複使用的 React Hook 與 Component
- ✅ 高效能優化（使用 Intersection Observer + requestAnimationFrame）
- ✅ 平滑的主題切換過渡效果（0.8s cubic-bezier）
- ✅ 自動文字顏色切換（深色背景 → 白色文字，淺色背景 → 黑色文字）

## 使用方式

### 基本用法

在任何頁面中，使用 `ThemeSection` 組件包裹你想要觸發主題切換的區塊：

```tsx
import { ThemeSection } from '../components/layout/ThemeSection';

export default function MyPage() {
  return (
    <div>
      {/* 深色主題區塊（黑色背景，白色文字） */}
      <ThemeSection theme="dark">
        <div className="py-20">
          <h1>這個區塊會觸發深色主題</h1>
        </div>
      </ThemeSection>

      {/* 淺色主題區塊（白色背景，黑色文字） */}
      <ThemeSection theme="light">
        <div className="py-20">
          <h1>這個區塊會觸發淺色主題</h1>
        </div>
      </ThemeSection>
    </div>
  );
}
```

### 進階用法

#### 自訂觸發閾值

```tsx
<ThemeSection 
  theme="light" 
  threshold={0.5}  // 當元素 50% 可見時觸發
  rootMargin="-100px"  // 提前 100px 觸發
>
  <div>內容</div>
</ThemeSection>
```

#### 使用 Hook 直接控制

如果你需要更細緻的控制，可以直接使用 `useScrollTheme` Hook：

```tsx
import { useScrollTheme } from '../hooks/useScrollTheme';

export default function MyComponent() {
  const sectionRef = useScrollTheme({ 
    theme: 'light',
    threshold: 0.3,
    rootMargin: '0px'
  });

  return (
    <section ref={sectionRef}>
      <h1>這個區塊會觸發淺色主題</h1>
    </section>
  );
}
```

#### 在組件中讀取當前主題

```tsx
import { useTheme } from '../contexts/ThemeContext';

export default function MyComponent() {
  const { currentTheme } = useTheme();

  return (
    <div>
      當前主題：{currentTheme === 'dark' ? '深色' : '淺色'}
    </div>
  );
}
```

## 技術細節

### 效能優化

1. **Intersection Observer**: 使用瀏覽器原生 API 偵測元素可見度，比滾動事件更高效
2. **requestAnimationFrame**: 批次處理主題切換，避免過度觸發
3. **CSS Transition**: 使用硬體加速的 CSS transition，而非 JavaScript 動畫

### 檔案結構

```
src/
├── contexts/
│   └── ThemeContext.tsx      # 主題狀態管理 Context
├── hooks/
│   └── useScrollTheme.ts     # 滾動主題切換 Hook
└── components/
    └── layout/
        └── ThemeSection.tsx   # 主題區塊組件
```

### 自訂樣式

主題切換的過渡效果在 `globals.css` 中定義：

```css
body {
  transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
```

你可以調整過渡時間和緩動函數來符合你的設計需求。

## 注意事項

1. **初始主題**: 預設為深色主題（`dark`）
2. **文字顏色**: `ThemeSection` 會自動根據當前主題調整文字顏色，但如果你有自訂的顏色類別，可能需要手動處理
3. **效能**: 建議每個頁面不要有太多主題切換區塊（建議 3-5 個），以確保最佳效能

## 範例

查看 `src/app/page.tsx` 可以看到實際的使用範例：
- Hero 區塊使用 `theme="dark"`
- 「向川國際為何值得信任？」區塊使用 `theme="light"`

滾動頁面時，你會看到背景在黑色和白色之間平滑切換。
