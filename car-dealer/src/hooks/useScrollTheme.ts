'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useTheme } from '../contexts/ThemeContext';

type ThemeMode = 'dark' | 'light';

interface UseScrollThemeOptions {
  /**
   * 當元素進入視窗時要切換到的主題
   * @default 'dark'
   */
  theme?: ThemeMode;
  /**
   * Intersection Observer 的 threshold（0-1）
   * 當元素的可見度達到這個值時觸發主題切換
   * @default 0.3
   */
  threshold?: number;
  /**
   * 觸發主題切換的視窗頂部偏移量（px）
   * @default 0
   */
  rootMargin?: string;
}

/**
 * 滾動觸發主題切換 Hook
 * 
 * @example
 * ```tsx
 * const sectionRef = useScrollTheme({ theme: 'light' });
 * return <section ref={sectionRef}>...</section>
 * ```
 */
export function useScrollTheme(options: UseScrollThemeOptions = {}): RefObject<HTMLElement> {
  const { theme = 'dark', threshold = 0.3, rootMargin = '0px' } = options;
  const { setCurrentTheme } = useTheme();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 使用 Intersection Observer 來偵測元素是否進入視窗
    // 使用 requestAnimationFrame 來優化效能
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // 使用 requestAnimationFrame 來批次處理，避免過度觸發
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentTheme(theme);
            }
          });
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  }, [theme, threshold, rootMargin, setCurrentTheme]);

  return ref;
}
