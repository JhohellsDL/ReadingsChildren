import { StyleSheet, Text, View } from "react-native";
import { Question, Story } from "../../types/story";
import { theme } from "../../theme";
export const ResponsesReviewResult = ({
  questions,
  respuestas,
}: {
  questions: Question[];
  respuestas: number[];
}) => {
  return (
    <View style={s.container}>
      <Text style={s.seccion}>Revisión de respuestas</Text>

      {questions.map((pregunta: Question, index: number) => {
        const correcta = respuestas[index] === pregunta.respuesta_correcta;

        return (
          <View
            key={pregunta.id}
            style={[
              s.card,
              {
                borderLeftColor: correcta
                  ? theme.colors.success
                  : theme.colors.error,
              },
            ]}
          >
            {/* Pregunta */}
            <Text style={s.preguntaTexto}>{pregunta.pregunta}</Text>

            {/* Respuesta del usuario */}
            <Text
              style={[
                s.respuestaTexto,
                { color: correcta ? theme.colors.success : theme.colors.error },
              ]}
            >
              {correcta ? "✅" : "❌"} Tu respuesta:{" "}
              {pregunta.opciones[respuestas[index]]}
            </Text>

            {/* Respuesta correcta — solo si falló */}
            {!correcta && (
              <Text style={s.correctaTexto}>
                ✓ Correcta: {pregunta.opciones[pregunta.respuesta_correcta]}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const s = StyleSheet.create({
  container: { marginBottom: 24 },
  seccion: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4, // 👈 de vuelta al borderLeft
    gap: 6,
  },
  preguntaTexto: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 20,
  },
  respuestaTexto: { fontSize: theme.fontSize.sm, fontWeight: "600" },
  correctaTexto: { fontSize: theme.fontSize.sm, color: theme.colors.success },
});
