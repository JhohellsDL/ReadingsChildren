import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
export const RowStatusResult = ({
  correctas,
  questionsLength,
  scoreObtained,
}: {
  correctas: number;
  questionsLength: number;
  scoreObtained: number;
}) => {
  const incorrectas = questionsLength - correctas;

  return (
    <View style={s.statsRow}>
      {/* Correctas */}
      <View style={s.statBox}>
        <Text style={[s.statNumero, { color: theme.colors.success }]}>
          {correctas}
        </Text>
        <Text style={s.statLabel}>Correctas</Text>
      </View>

      {/* Incorrectas */}
      <View style={s.statBox}>
        <Text style={[s.statNumero, { color: theme.colors.error }]}>
          {incorrectas}
        </Text>
        <Text style={s.statLabel}>Incorrectas</Text>
      </View>

      {/* Puntos */}
      <View style={s.statBox}>
        <Text style={[s.statNumero, { color: theme.colors.warning }]}>
          {scoreObtained}
        </Text>
        <Text style={s.statLabel}>Puntos</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statBox: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    alignItems: "center",
    gap: 4,
    ...theme.neo,
  },
  statNumero: { fontSize: theme.fontSize.xxl, fontWeight: "800" },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontWeight: "500",
  },
});
