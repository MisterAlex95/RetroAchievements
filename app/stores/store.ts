import { create } from "zustand";
import { getItem, removeItem, setItem } from "../helpers/storage";

export type State<T> = {
  data: T | null;
  isFetching: boolean;
  error: string | null;
  cacheKey: string | null;
  fetchData: (value?: any) => Promise<void>;
  clearCache: () => void;
};

export const createStore = <T = any>(
  cacheKey: string,
  apiCall: (value?: any) => Promise<T>,
  ttl: number = 60000,
) =>
  create<State<T>>((set, get) => ({
    data: null,
    isFetching: false,
    error: null,
    cacheKey: cacheKey,
    fetchData: async (value?: any) => {
      const cacheKey = get().cacheKey;
      if (!cacheKey) {
        throw new Error("cacheKey is not set");
      }

      set({ isFetching: true, error: null });

      try {
        const cachedData = await getItem<T>(cacheKey);
        if (cachedData) {
          set({ data: cachedData, isFetching: false, cacheKey });
          return;
        }

        const data = await apiCall(value);
        set({ data, isFetching: false, cacheKey });
        await setItem(cacheKey, data, ttl);
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message, isFetching: false });
        }
      }
    },
    clearCache: async () => {
      const cacheKey = get().cacheKey;
      if (cacheKey) {
        await removeItem(cacheKey);
        set({ data: null, cacheKey: null });
      }
    },
  }));
