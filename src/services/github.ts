import type { Story } from "../types/story";

const BASE_URL =
  "https://raw.githubusercontent.com/JhohellsDL/stories-db/main/stories";

export const fetchStories = async (): Promise<Story[]> => {
  const response = await fetch(`${BASE_URL}/cuentos.json`);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};
