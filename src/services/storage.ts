import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  CACHE_KEY: "stories-db",
  PERFIL_USER_KEY: "perfil-user",
  PROGRESS_KEY: "progress",
} as const;

// ------ Cache ------------------------------------------------------------------
export const setCache = async (data: any) => {
  const payload = {
    data,
    timestamp: new Date().toISOString(),
  };
  await AsyncStorage.setItem(STORAGE_KEYS.CACHE_KEY, JSON.stringify(payload));
};

export const getCache = async () => {
  const cache = await AsyncStorage.getItem(STORAGE_KEYS.CACHE_KEY);
  if (!cache) return null;
  const { data, timestamp } = JSON.parse(cache);
  const isExpired =
    new Date(timestamp).getTime() + 1000 * 60 * 60 * 24 < Date.now(); // 24 hours
  return isExpired ? null : data;
};

export const removeCache = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.CACHE_KEY);
};

// ------ Perfil User ------------------------------------------------------------
export const getPerfilUser = async () => {
  const perfilUser = await AsyncStorage.getItem(STORAGE_KEYS.PERFIL_USER_KEY);
  return perfilUser ? JSON.parse(perfilUser) : null;
};

export const setPerfilUser = async (data: any) => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.PERFIL_USER_KEY,
    JSON.stringify(data),
  );
};

export const removePerfilUser = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.PERFIL_USER_KEY);
};

// ------ Progress ----------------------------------------------------------------
export const getProgress = async () => {
  const progress = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS_KEY);
  return progress ? JSON.parse(progress) : null;
};

export const setProgress = async (data: any) => {
  const progress = await getProgress();
  const newProgress = {
    ...progress,
    ...data,
  };
  await AsyncStorage.setItem(
    STORAGE_KEYS.PROGRESS_KEY,
    JSON.stringify(newProgress),
  );
};

export const removeProgress = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.PROGRESS_KEY);
};
