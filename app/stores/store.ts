import { create } from "zustand";
import { getItem, removeItem, setItem } from "../helpers/storage";

export type State<T> = {
  data: T | null;
  isFetching: boolean;
  error: string | null;
  cacheKey: string | null;
  fetchData: (value?: any) => Promise<void>;
};

export const createStore = <T = any>(
  cacheKey: string,
  apiCall: (value?: any) => Promise<T>,
  ttl: number = 10 * 60 * 1000, // 10 minutes
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

      const specificCacheKey =
        value !== undefined ? `${cacheKey}-${value}` : cacheKey;

      set({ isFetching: true, error: null });

      try {
        const cachedData = await getItem<T>(specificCacheKey);
        if (cachedData) {
          set({
            data: cachedData,
            isFetching: false,
            cacheKey: specificCacheKey,
          });
          return;
        }

        const data = await apiCall(value);
        set({ data, isFetching: false, cacheKey: specificCacheKey });
        await setItem(specificCacheKey, data, ttl);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          set({ error: error.message, isFetching: false });
        }
      }
    },
  }));
