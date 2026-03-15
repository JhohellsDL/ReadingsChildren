import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { Story } from "../../types/story";
import { Progress } from "../../types";
import { getBadgeCategoryColor } from "../../constans/badge.const";

export const DetailStoryInfo = ({
  cuento,
  progreso,
}: {
  cuento: Story;
  progreso: Progress;
}) => {
  const storyProgress = progreso.stories?.[cuento.id];
  const leido = storyProgress?.read ?? false;
  const quiz = storyProgress?.quizCompleted ?? false;
  const ptsObtenidos = storyProgress?.scoreObtained ?? 0;

  const categoriaColor = getBadgeCategoryColor(cuento.categoria);

  return (
    <View style={s.info}>
      {/* Badge categoría + tiempo */}
      <View style={s.badgeRow}>
        <View style={[s.badge, { backgroundColor: categoriaColor.bg }]}>
          <Text style={[s.badgeTexto, { color: categoriaColor.text }]}>
            {cuento.categoria}
          </Text>
        </View>
        <Text style={s.tiempo}>⏱ {cuento.tiempo_lectura}</Text>
      </View>

      {/* Título y descripción */}
      <Text style={s.titulo}>{cuento.titulo}</Text>
      <Text style={s.descripcion}>{cuento.descripcion}</Text>

      {/* Estado */}
      <View style={s.estadoBox}>
        <View style={s.estadoItem}>
          <Text style={s.estadoEmoji}>{leido ? "✅" : "📭"}</Text>
          <Text style={[s.estadoLabel, leido && s.labelLeido]}>
            {leido ? "Leído" : "Sin leer"}
          </Text>
        </View>

        <View style={s.separador} />

        <View style={s.estadoItem}>
          <Text style={s.estadoEmoji}>{quiz ? "🏆" : "❓"}</Text>
          <Text style={[s.estadoLabel, quiz && s.labelQuiz]}>
            {quiz
              ? `${ptsObtenidos}/${cuento.puntos_totales} pts`
              : "Quiz pendiente"}
          </Text>
        </View>

        <View style={s.separador} />

        <View style={s.estadoItem}>
          <Text style={s.estadoEmoji}>⭐</Text>
          <Text style={[s.estadoLabel, s.labelPuntos]}>
            {cuento.puntos_totales} pts max
          </Text>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  info: { padding: 24 },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  badge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  badgeTexto: { fontSize: theme.fontSize.xs, fontWeight: "500" },
  tiempo: { color: theme.colors.textMuted, fontSize: theme.fontSize.xs },
  titulo: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
    lineHeight: 34,
  },
  descripcion: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    lineHeight: 24,
    marginBottom: 24,
  },
  estadoBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  separador: {
    width: 0.5,
    height: "100%",
    backgroundColor: theme.colors.border,
  },
  estadoItem: { alignItems: "center", gap: 6, flex: 1 },
  estadoEmoji: { fontSize: 22 },
  estadoLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontWeight: "500",
    textAlign: "center",
  },
  labelLeido: { color: "#27500A" },
  labelQuiz: { color: theme.colors.primaryLight },
  labelPuntos: { color: "#BA7517" },
});
