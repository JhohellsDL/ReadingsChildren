import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constans";
import { CuentosResponse } from "../../types";

export const setCacheStories = async (data: CuentosResponse) => {
  const payload = {
    data,
    timestamp: new Date().toISOString(),
  };
  await AsyncStorage.setItem(STORAGE_KEYS.CACHE_KEY, JSON.stringify(payload));
};

export const getCacheStories = async () => {
  const cache = await AsyncStorage.getItem(STORAGE_KEYS.CACHE_KEY);
  if (!cache) return null;
  const { data, timestamp } = JSON.parse(cache);
  const isExpired =
    new Date(timestamp).getTime() + 1000 * 60 * 60 * 24 < Date.now(); // 24 hours
  return isExpired ? null : data;
};

export const removeCacheStories = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.CACHE_KEY);
};
