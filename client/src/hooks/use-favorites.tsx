import { useState, useCallback, useEffect } from "react";
import { LocationResult } from "./use-weather";

const STORAGE_KEY = "btb-favorite-locations";

export function useFavorites() {
  const [favorites, setFavorites] = useState<LocationResult[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((item: any) =>
          typeof item.id === "number" &&
          typeof item.name === "string" &&
          typeof item.latitude === "number" &&
          typeof item.longitude === "number"
        )) {
          setFavorites(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setFavorites([]);
    }
  }, []);

  const saveFavorites = useCallback((updated: LocationResult[]) => {
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addFavorite = useCallback((location: LocationResult) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === location.id)) return prev;
      const updated = [...prev, location];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((locationId: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== locationId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (locationId: number) => favorites.some((f) => f.id === locationId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
