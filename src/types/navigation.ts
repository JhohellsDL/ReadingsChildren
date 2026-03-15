import type { Story } from "./story";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Detalle: { cuento: Story };
  Lector: { cuento: Story };
  Quiz: { cuento: Story };
  Resultado: {
    cuento: Story;
    respuestas: number[];
    puntaje_obtenido: number;
    puntaje_total: number;
  };
};
