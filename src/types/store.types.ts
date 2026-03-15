export type StoryProgress = {
  read: boolean;
  dateRead: string | null;
  quizCompleted: boolean;
  scoreObtained: number;
  totalScore: number;
  answers: number[];
};

export type Progress = {
  globalScore: number;
  stories: Record<string, StoryProgress>;
};

export type PerfilUser = {
  name: string;
  creationDate: string;
};
