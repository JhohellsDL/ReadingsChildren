import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
type NivelConfig = {
  medalla: string;
  mensaje: string;
  borderColor: string;
  numColor: string;
  tagColor: string;
};

const getNivel = (porcentaje: number): NivelConfig => {
  if (porcentaje === 100)
    return {
      medalla: "🥇",
      mensaje: "¡Perfecto! Dominaste el cuento",
      borderColor: theme.colors.warning,
      numColor: theme.colors.warning,
      tagColor: theme.colors.warning,
    };
  if (porcentaje >= 75)
    return {
      medalla: "🥈",
      mensaje: "¡Muy bien! Casi perfecto",
      borderColor: theme.colors.textMuted,
      numColor: theme.colors.text,
      tagColor: theme.colors.textMuted,
    };
  if (porcentaje >= 50)
    return {
      medalla: "🥉",
      mensaje: "Buen intento, sigue practicando",
      borderColor: theme.colors.primary,
      numColor: theme.colors.primaryLight,
      tagColor: theme.colors.primaryLight,
    };
  return {
    medalla: "📚",
    mensaje: "Vuelve a leer el cuento e inténtalo de nuevo",
    borderColor: theme.colors.error,
    numColor: theme.colors.error,
    tagColor: theme.colors.error,
  };
};

export const MedalStatus = ({ porcentaje }: { porcentaje: number }) => {
  const nivel = getNivel(porcentaje);

  return (
    <View style={[s.medallaBox, { borderColor: nivel.borderColor }]}>
      <Text style={s.medallaEmoji}>{nivel.medalla}</Text>

      <View style={s.porcentajeRow}>
        <Text style={[s.porcentaje, { color: nivel.numColor }]}>
          {porcentaje}
        </Text>
        <Text style={[s.porciento, { color: nivel.numColor }]}>%</Text>
      </View>

      <Text style={[s.mensaje, { color: nivel.tagColor }]}>
        {nivel.mensaje}
      </Text>
    </View>
  );
};

const s = StyleSheet.create({
  medallaBox: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    gap: 10,
    ...theme.neo,
  },
  medallaEmoji: { fontSize: 56 },
  porcentajeRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  porcentaje: { fontSize: 44, fontWeight: "800" },
  porciento: { fontSize: 22, fontWeight: "700" },
  mensaje: {
    fontSize: theme.fontSize.sm,
    textAlign: "center",
    fontWeight: "600",
  },
});
