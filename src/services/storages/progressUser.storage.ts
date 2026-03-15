import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constans";
import { Progress, StoryProgress } from "../../types";

export const getProgressUser = async () => {
  const progress = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS_KEY);
  return progress ? JSON.parse(progress) : null;
};

export const setProgressUser = async (
  data: Progress | Record<string, StoryProgress>,
) => {
  const progress = await getProgressUser();
  const newProgress = {
    ...progress,
    ...data,
  };

  await AsyncStorage.setItem(
    STORAGE_KEYS.PROGRESS_KEY,
    JSON.stringify(newProgress),
  );
};

export const removeProgressUser = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.PROGRESS_KEY);
};
