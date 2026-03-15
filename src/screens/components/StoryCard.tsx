import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Story } from "../../types/story";
import { Text } from "react-native";
import { theme } from "../../theme";
import { StoryProgress } from "../../types";
import { getBadgeCategoryColor } from "../../constans/badge.const";

export const StoryCard = ({
  item,
  progreso,
  navigation,
}: {
  item: Story;
  progreso: StoryProgress | undefined;
  navigation: any;
}) => {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => navigation.navigate("Detalle", { cuento: item })}
    >
      {/* Categoría + tiempo */}
      <View style={s.cardTop}>
        <View
          style={[
            s.badge,
            { backgroundColor: getBadgeCategoryColor(item.categoria).bg },
          ]}
        >
          <Text
            style={[
              s.badgeTexto,
              { color: getBadgeCategoryColor(item.categoria).text },
            ]}
          >
            {item.categoria}
          </Text>
        </View>
        <Text style={s.tiempo}>⏱ {item.tiempo_lectura}</Text>
      </View>

      {/* Título y descripción */}
      <Text style={s.titulo}>{item.titulo}</Text>
      <Text style={s.descripcion} numberOfLines={2}>
        {item.descripcion}
      </Text>

      {/* Footer con estado y puntos */}
      <View style={s.cardFooter}>
        <View style={s.tags}>
          {/* Tag Leído */}
          <View style={[s.tag, progreso?.read ? s.tagLeido : s.tagPendiente]}>
            <Text
              style={[
                s.tagTexto,
                progreso?.read ? s.tagLeidoTexto : s.tagPendienteTexto,
              ]}
            >
              {progreso?.read ? "Leído" : "Sin leer"}
            </Text>
          </View>

          {/* Tag Quiz */}
          <View
            style={[
              s.tag,
              progreso?.quizCompleted ? s.tagQuiz : s.tagPendiente,
            ]}
          >
            <Text
              style={[
                s.tagTexto,
                progreso?.quizCompleted ? s.tagQuizTexto : s.tagPendienteTexto,
              ]}
            >
              {progreso?.quizCompleted
                ? `Quiz ${progreso?.scoreObtained}/${item.puntos_totales} pts`
                : "Quiz pendiente"}
            </Text>
          </View>
        </View>
        <Text style={s.puntos}>{item.puntos_totales} pts</Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 18,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    gap: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: theme.colors.primary + "22",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTexto: {
    color: theme.colors.primaryLight,
    fontSize: theme.fontSize.xs,
    fontWeight: "500",
  },
  tiempo: { fontSize: theme.fontSize.xs, color: theme.colors.textMuted },
  titulo: {
    fontSize: theme.fontSize.lg,
    fontWeight: "500",
    color: theme.colors.text,
  },
  descripcion: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
  },
  tags: { flexDirection: "row", gap: 6 },
  tag: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagTexto: { fontSize: 11, fontWeight: "500" },
  tagPendiente: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  tagPendienteTexto: { color: theme.colors.textMuted },
  tagLeido: { backgroundColor: theme.colors.success + "22" },
  tagLeidoTexto: { color: theme.colors.success },
  tagQuiz: { backgroundColor: theme.colors.primary + "22" },
  tagQuizTexto: { color: theme.colors.primaryLight },
  puntos: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.warning,
    fontWeight: "500",
  },
});
