import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { theme } from "../theme";
import { useProgreso } from "../hooks/useProgreso";
import { FooterDetail } from "./components/FooterDetail";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const LectorScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { cuento } = route.params;
  const { progreso, leerCuento } = useProgreso();
  const insets = useSafeAreaInsets();

  const parrafos = cuento.contenido
    .split("\n")
    .filter((p: string) => p.trim() !== "");

  const quizCompleted = progreso.stories?.[cuento.id]?.quizCompleted ?? false;

  useEffect(() => {
    leerCuento(cuento.id);
  }, []);

  const handleCompleteQuiz = () => navigation.navigate("Quiz", { cuento });

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo} numberOfLines={1}>
          {cuento.titulo}
        </Text>
        <View style={s.categoriaBadge}>
          <Text style={s.categoriaTexto}>{cuento.categoria}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Párrafos */}
        <View style={s.contenido}>
          {parrafos.map((parrafo: string, index: number) => (
            <Text key={index} style={s.parrafo}>
              {parrafo}
            </Text>
          ))}
        </View>

        {/* Fin del cuento */}
        <View style={s.finBox}>
          <Text style={s.finEmoji}>🎉</Text>
          <Text style={s.finTexto}>¡Terminaste el cuento!</Text>
          {!quizCompleted && (
            <Text style={s.finSubtexto}>
              Ahora pon a prueba tu comprensión lectora
            </Text>
          )}
        </View>
      </ScrollView>

      <FooterDetail
        cuento={cuento}
        progreso={progreso}
        screen="Lector"
        onReadStory={() => {}}
        onCompleteQuiz={handleCompleteQuiz}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: 24, paddingBottom: 120 },

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
  categoriaBadge: {
    backgroundColor: theme.colors.primary + "22",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoriaTexto: {
    color: theme.colors.primaryLight,
    fontSize: theme.fontSize.xs,
    fontWeight: "500",
  },

  // Contenido
  contenido: { gap: 16 },
  parrafo: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 28,
    textAlign: "justify",
  },

  // Fin
  finBox: {
    alignItems: "center",
    marginTop: 48,
    padding: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  finEmoji: { fontSize: 40, marginBottom: 12 },
  finTexto: {
    fontSize: theme.fontSize.lg,
    fontWeight: "500",
    color: theme.colors.text,
  },
  finSubtexto: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: 6,
    textAlign: "center",
  },
});
