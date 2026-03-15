import { useState, useEffect, useCallback } from "react";
import type { CuentosResponse } from "../types/story";
import { loadStories } from "../services/loadStories";

export const useData = () => {
  const [data, setData] = useState<CuentosResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async (isMounted?: () => boolean) => {
    const check = isMounted ?? (() => true);
    try {
      setLoading(true);
      setError(null);

      const result = await loadStories();
      if (check()) setData(result);
    } catch (err) {
      if (check()) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (check()) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    loadData(() => mounted);
    return () => {
      mounted = false;
    };
  }, [loadData]);

  return { data, loading, error, refresh: () => loadData() };
};
