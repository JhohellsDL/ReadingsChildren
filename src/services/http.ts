import { TIMEOUT_MS } from "../constans/base.const";

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
};
