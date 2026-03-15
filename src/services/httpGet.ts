import { fetchWithTimeout } from "./http";

export const httpGet = async <T>(url: string): Promise<T> => {
  const response = await fetchWithTimeout(url);
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
};
