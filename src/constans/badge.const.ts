export const BADGE_CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string }
> = {
  Aventura: { bg: "#EEEDFE", text: "#3C3489" },
  Misterio: { bg: "#E1F5EE", text: "#085041" },
  "Ciencia ficción": { bg: "#FAEEDA", text: "#633806" },
  Terror: { bg: "#FCEBEB", text: "#791F1F" },
  Fantasía: { bg: "#FBEAF0", text: "#72243E" },
  Historia: { bg: "#E6F1FB", text: "#0C447C" },
};

export const getBadgeCategoryColor = (categoria: string) =>
  BADGE_CATEGORY_COLORS[categoria] ?? { bg: "#F1EFE8", text: "#444441" };
