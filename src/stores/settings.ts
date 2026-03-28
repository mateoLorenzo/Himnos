import { create } from "zustand";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "settings" });

interface SettingsState {
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  fontSize: storage.getNumber("fontSize") ?? 18,

  setFontSize: (size: number) => {
    storage.set("fontSize", size);
    set({ fontSize: size });
  },
}));
