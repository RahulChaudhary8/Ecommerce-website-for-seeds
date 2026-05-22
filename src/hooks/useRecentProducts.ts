import { useCallback, useState } from "react";
import type { Product } from "../types/product";

const RECENT_KEY = "agroseeds-recent";
const MAX_RECENT = 6;

export function useRecentProducts() {
  const [recentIds, setRecentIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecent = useCallback((product: Product) => {
    setRecentIds((prev) => {
      const next = [product.id, ...prev.filter((id) => id !== product.id)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recentIds, addRecent };
}
