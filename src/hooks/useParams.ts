
// 전역 선택 상태
import { create } from "zustand";

type SelState = {
  year?: string;
  month?: string; // YYYY-MM
  day?: string; // YYYY-MM-DD
  strategy: string;
  setYear: (y: string) => void;
  setMonth: (m: string) => void;
  setDay: (d: string) => void;
  setStrategy: (s: string) => void;
};

export const useParams = create<SelState>((set) => ({
  strategy: "ema_rsi_vol",
  setYear: (year) => set({ year, month: undefined, day: undefined }),
  setMonth: (month) => set({ month, day: undefined }),
  setDay: (day) => set({ day }),
  setStrategy: (strategy) => set({ strategy }),
}));
