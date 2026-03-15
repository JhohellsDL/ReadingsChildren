import { contentApi } from "./contentApi";
import { CuentosResponse } from "../types/story";

export const loadStories = async (): Promise<CuentosResponse> => {
  const response = await contentApi.getStories();
  return response;
};
