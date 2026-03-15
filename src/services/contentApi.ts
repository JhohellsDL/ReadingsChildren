import { CuentosResponse } from "../types/story";
import { httpGet } from "./httpGet";
import { BASE_URL_GITHUB } from "../constans/base.const";

export const contentApi = {
  getStories: async () => {
    const response = await httpGet<CuentosResponse>(
      `${BASE_URL_GITHUB}/cuentos.json`,
    );
    return response;
  },
};
