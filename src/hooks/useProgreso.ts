import { useState, useEffect, useCallback } from "react";
import { getProgressUser, setProgressUser } from "../services/storages";
import { Progress, StoryProgress } from "../types";

const calculateGlobalScore = (stories: Record<string, StoryProgress>) => {
  return Object.values(stories ?? {}).reduce(
    (acc, curr) => acc + curr.scoreObtained,
    0,
  );
};

const normalizeProgress = (raw: unknown): Progress => {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const withStories = raw as { stories?: Record<string, StoryProgress> };
    const stories =
      withStories.stories ?? (raw as Record<string, StoryProgress>);
    return {
      globalScore: calculateGlobalScore(stories),
      stories: stories ?? {},
    };
  }
  return { globalScore: 0, stories: {} };
};

export const useProgreso = () => {
  const [progreso, setProgreso] = useState<Progress>({
    globalScore: 0,
    stories: {},
  });
  const [puntajeGlobal, setPuntajeGlobal] = useState(0);

  useEffect(() => {
    cargarProgreso();
  }, []);

  const cargarProgreso = async () => {
    const raw = await getProgressUser();
    const p = normalizeProgress(raw ?? {});
    setProgreso(p);
    setPuntajeGlobal(p.globalScore);
  };

  const completarQuiz = useCallback(
    async (
      cuentoId: string,
      resultado: {
        scoreObtained: number;
        totalScore: number;
        answers: number[];
      },
    ) => {
      const raw = await getProgressUser();
      const actual = normalizeProgress(raw ?? {});
      const prev = (actual.stories[cuentoId] ?? {}) as Partial<StoryProgress>;
      await setProgressUser({
        [cuentoId]: {
          read: prev.read ?? true,
          dateRead: prev.dateRead ?? new Date().toISOString(),
          quizCompleted: true,
          scoreObtained: resultado.scoreObtained,
          totalScore: resultado.totalScore,
          answers: resultado.answers,
        },
      });
      await cargarProgreso();
    },
    [],
  );

  const leerCuento = useCallback(async (cuentoId: string) => {
    await setProgressUser({
      [cuentoId]: {
        read: true,
        dateRead: new Date().toISOString(),
        quizCompleted: false,
        scoreObtained: 0,
        totalScore: 0,
        answers: [],
      },
    });
    await cargarProgreso();
  }, []);

  const fueLeido = (cuentoId: string) =>
    progreso.stories[cuentoId]?.read ?? false;
  const quizCompletado = (cuentoId: string) =>
    progreso.stories[cuentoId]?.quizCompleted ?? false;
  const puntajeCuento = (cuentoId: string) =>
    progreso.stories[cuentoId]?.scoreObtained ?? 0;

  return {
    progreso,
    puntajeGlobal,
    completarQuiz,
    leerCuento,
    fueLeido,
    quizCompletado,
    puntajeCuento,
    refrescar: cargarProgreso,
  };
};
