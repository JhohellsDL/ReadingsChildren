import { StyleSheet, Text, View } from "react-native";
import { Question } from "../../types/story";
import { theme } from "../../theme";

export const StatusBarQuiz = ({
  actual,
  preguntas,
  respuestas,
}: {
  actual: number;
  preguntas: Question[];
  respuestas: number[];
}) => {
  // Color de cada indicador
  const getIndicadorColor = (index: number) => {
    if (index === actual) return theme.colors.primary; // actual
    if (index > actual) return theme.colors.surface; // pendiente
    // ya respondida
    return respuestas[index] === preguntas[index].respuesta_correcta
      ? theme.colors.success // correcta
      : theme.colors.error; // incorrecta
  };

  // Badge cambia de color en la última pregunta
  const esUltima = actual === preguntas.length - 1;
  const badgeBg = esUltima ? "#FAEEDA" : theme.colors.primary + "22";
  const badgeTextColor = esUltima ? "#633806" : theme.colors.primaryLight;

  return (
    <View style={s.container}>
      {/* Fila superior: contador + puntos */}
      <View style={s.progresoRow}>
        <View style={s.contadorRow}>
          <View style={[s.badge, { backgroundColor: badgeBg }]}>
            <Text style={[s.badgeTexto, { color: badgeTextColor }]}>
              {actual + 1} / {preguntas.length}
            </Text>
          </View>
          <Text style={s.progresoTexto}>Pregunta</Text>
        </View>
      </View>

      {/* Barra de progreso */}
      <View style={s.barraFondo}>
        <View
          style={[
            s.barraRelleno,
            { width: `${((actual + 1) / preguntas.length) * 100}%` },
          ]}
        />
      </View>

      {/* Indicadores por pregunta */}
      <View style={s.indicadores}>
        {preguntas.map((_, index) => (
          <View
            key={index}
            style={[
              s.indicador,
              { backgroundColor: getIndicadorColor(index) },
              index === actual && s.indicadorActual,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { marginBottom: 8 },
  progresoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  contadorRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  badge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeTexto: { fontSize: theme.fontSize.xs, fontWeight: "500" },
  progresoTexto: { color: theme.colors.textMuted, fontSize: theme.fontSize.sm },
  puntosTexto: {
    color: theme.colors.warning,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
  },
  barraFondo: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  barraRelleno: {
    height: 6,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  indicadores: { flexDirection: "row", gap: 4, marginBottom: 20 },
  indicador: { flex: 1, height: 4, borderRadius: 2 },
  indicadorActual: { height: 6 }, // un poco más alto para destacar la actual
});
