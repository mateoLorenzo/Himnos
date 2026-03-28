import { create } from "zustand";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "favorites" });

function loadFavorites(): Set<number> {
  const raw = storage.getString("ids");
  if (!raw) return new Set();
  return new Set(JSON.parse(raw) as number[]);
}

function saveFavorites(ids: Set<number>): void {
  storage.set("ids", JSON.stringify([...ids]));
}

interface FavoritesState {
  ids: Set<number>;
  toggle: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: loadFavorites(),

  toggle: (id: number) => {
    const next = new Set(get().ids);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    saveFavorites(next);
    set({ ids: next });
  },
}));
