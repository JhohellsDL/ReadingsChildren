import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constans";
import { PerfilUser } from "../../types";

export const getPerfilUser = async () => {
  const perfilUser = await AsyncStorage.getItem(STORAGE_KEYS.PERFIL_USER_KEY);
  return perfilUser ? (JSON.parse(perfilUser) as PerfilUser) : null;
};

export const setPerfilUser = async (data: PerfilUser) => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.PERFIL_USER_KEY,
    JSON.stringify(data) as unknown as string,
  );
};

export const removePerfilUser = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.PERFIL_USER_KEY);
};
