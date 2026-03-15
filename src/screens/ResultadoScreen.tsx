import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { theme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MedalStatus } from "./components/MedalStatus";
import { RowStatusResult } from "./components/RowStatusResult";
import { ResponsesReviewResult } from "./components/ResponsesReviewResult";
import { useProgreso } from "../hooks/useProgreso";

export const ResultadoScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const insets = useSafeAreaInsets();
  const { cuento, respuestas, puntaje_obtenido, puntaje_total } = route.params;
  const { puntajeGlobal } = useProgreso();

  const porcentaje = Math.round((puntaje_obtenido / puntaje_total) * 100);
  const correctas = respuestas.filter(
    (r: number, i: number) => r === cuento.preguntas[i].respuesta_correcta,
  ).length;

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          style={s.backBtn}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo} numberOfLines={1}>
          Resultado — {cuento.titulo}
        </Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <MedalStatus porcentaje={porcentaje} />

        <RowStatusResult
          correctas={correctas}
          questionsLength={cuento.preguntas.length}
          scoreObtained={puntaje_obtenido}
        />

        <ResponsesReviewResult
          questions={cuento.preguntas}
          respuestas={respuestas}
        />

        {/* Puntaje global acumulado */}
        <View style={s.globalBox}>
          <Text style={s.globalLabel}>Tu puntaje total acumulado</Text>
          {/* 👇 puntajeGlobal en lugar de puntaje_obtenido */}
          <Text style={s.globalPuntaje}>{puntajeGlobal} pts ⭐</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={s.boton}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={s.botonTexto}>🏠 Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: 24, paddingBottom: 140 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: "600",
  },
  headerTitulo: {
    flex: 1,
    fontSize: theme.fontSize.md,
    fontWeight: "500",
    color: theme.colors.text,
  },

  // Global box
  globalBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    alignItems: "center",
    marginTop: 8,
    ...theme.neo,
  },
  globalLabel: { fontSize: theme.fontSize.sm, color: theme.colors.textMuted },
  globalPuntaje: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "800",
    color: theme.colors.warning,
    marginTop: 6,
  },

  // Footer
  footer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  boton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 18,
    alignItems: "center",
  },
  botonTexto: { color: "#fff", fontWeight: "700", fontSize: theme.fontSize.md },
});
