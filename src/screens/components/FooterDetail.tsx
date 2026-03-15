import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { useProgreso } from "../../hooks/useProgreso";
import { Story } from "../../types/story";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Progress } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const FooterDetail = ({
  cuento,
  progreso,
  screen,
  onReadStory,
  onCompleteQuiz,
}: {
  cuento: Story;
  progreso: Progress;
  screen: "Detalle" | "Lector";
  onReadStory: () => void;
  onCompleteQuiz: () => void;
}) => {
  const insets = useSafeAreaInsets();

  const isDetalle = screen === "Detalle";
  const isLector = screen === "Lector";
  const quizCompleted = progreso.stories?.[cuento.id]?.quizCompleted ?? false;
  const isRead = progreso.stories?.[cuento.id]?.read ?? false;

  // En Detalle: solo si ya leyó. En Lector: siempre
  const showQuizButton = isLector || isRead;

  // Texto e ícono del botón de lectura
  const leerLabel = isRead ? "📖 Releer cuento" : "📖 Leer cuento";
  const leerStyle = isRead ? [s.boton, s.botonReleer] : [s.boton];

  // Texto e ícono del botón de quiz
  const quizLabel = quizCompleted ? "🏆 Repetir quiz" : "🧠 Hacer el quiz";
  const quizStyle = quizCompleted
    ? [s.boton, s.botonQuiz, s.botonRepetir]
    : [s.boton, s.botonQuiz];

  return (
    <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
      {/* Botón leer — solo en pantalla Detalle */}
      {isDetalle && (
        <TouchableOpacity style={leerStyle} onPress={onReadStory}>
          <Text style={[s.botonTexto, isRead && s.botonReleerTexto]}>
            {leerLabel}
          </Text>
        </TouchableOpacity>
      )}

      {/* Botón quiz */}
      {showQuizButton && (
        <TouchableOpacity style={quizStyle} onPress={onCompleteQuiz}>
          <Text style={s.botonTexto}>{quizLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  footer: {
    padding: 20,
    gap: 12,
    backgroundColor: theme.colors.background,
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.border,
  },
  boton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 18,
    alignItems: "center",
  },
  botonReleer: {
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  botonReleerTexto: {
    color: theme.colors.textMuted, // texto más apagado para el botón secundario
  },
  botonQuiz: { backgroundColor: theme.colors.accent },
  botonRepetir: { backgroundColor: theme.colors.success },
  botonTexto: { color: "#fff", fontWeight: "700", fontSize: theme.fontSize.md },
});
