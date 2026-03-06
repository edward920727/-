'use client';

import { type ReactNode } from 'react';
import { useScrollTheme } from '../../hooks/useScrollTheme';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeSectionProps {
  /**
   * 此區塊要使用的主題
   * - 'dark': 黑色背景，白色文字
   * - 'light': 白色背景，黑色文字
   */
  theme: 'dark' | 'light';
  /**
   * 子元素
   */
  children: ReactNode;
  /**
   * 額外的 className
   */
  className?: string;
  /**
   * Intersection Observer 的 threshold（0-1）
   * @default 0.3
   */
  threshold?: number;
  /**
   * 觸發主題切換的視窗頂部偏移量
   * @default '0px'
   */
  rootMargin?: string;
}

/**
 * 主題區塊組件
 * 當此區塊進入視窗時，會自動切換頁面背景主題
 * 
 * @example
 * ```tsx
 * <ThemeSection theme="light">
 *   <div>這個區塊會觸發淺色主題</div>
 * </ThemeSection>
 * 
 * <ThemeSection theme="dark">
 *   <div>這個區塊會觸發深色主題</div>
 * </ThemeSection>
 * ```
 */
export function ThemeSection({
  theme,
  children,
  className = '',
  threshold = 0.3,
  rootMargin = '0px',
}: ThemeSectionProps) {
  const sectionRef = useScrollTheme({ theme, threshold, rootMargin });
  const { currentTheme } = useTheme();

  // 根據當前主題動態調整文字顏色
  const textColorClass = currentTheme === 'light' ? 'text-black' : 'text-white';

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`${className} ${textColorClass}`}
    >
      {children}
    </section>
  );
}
