export const theme = {
  colors: {
    background: "#1C1C2E",
    surface: "#252540",
    surfaceLight: "#2E2E50",
    primary: "#7B61FF",
    primaryLight: "#9D87FF",
    accent: "#FF6B9D",
    success: "#4ECB71",
    error: "#FF6B6B",
    warning: "#FFD166",
    text: "#EAEAF5",
    textMuted: "#8888AA",
    border: "#3A3A5C",
  },

  // Sombra neomórfica hacia afuera
  neo: {
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  // Sombra neomórfica presionada
  neoPressed: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  borderRadius: {
    sm: 10,
    md: 18,
    lg: 26,
    xl: 36,
  },

  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
};
