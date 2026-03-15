import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { PerfilUser } from "../../types";

const getSaludo = () => {
  const hora = new Date().getHours();
  if (hora < 12) return "Buenos días ☀️";
  if (hora < 18) return "Buenas tardes 🌤️";
  return "Buenas noches 🌙";
};

const getIniciales = (nombre: string) => {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
};

export const HeaderUser = ({
  perfil,
  puntajeGlobal,
}: {
  perfil: PerfilUser | null;
  puntajeGlobal: number;
}) => {
  const iniciales = perfil?.name ? getIniciales(perfil.name) : "?";

  return (
    <View style={s.header}>
      <View style={s.avatar}>
        <Text style={s.avatarTexto}>{iniciales}</Text>
      </View>

      <View style={s.headerTextos}>
        <Text style={s.saludo}>{getSaludo()}</Text>
        <Text style={s.nombre}>{perfil?.name ?? "..."}</Text>
      </View>

      <View style={s.puntajeBox}>
        <Text style={s.puntajeNumero}>{puntajeGlobal}</Text>
        <Text style={s.puntajeLabel}>pts ⭐</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.primary + "33",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTexto: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.primaryLight,
  },
  headerTextos: { flex: 1 },
  saludo: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  nombre: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  puntajeBox: {
    backgroundColor: theme.colors.primary + "22",
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  puntajeNumero: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primaryLight,
  },
  puntajeLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primaryLight,
  },
});
