import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { theme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBarQuiz } from "./components/StatusBarQuiz";
import { useProgreso } from "../hooks/useProgreso";
import { Question } from "../types/story";

export const QuizScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const insets = useSafeAreaInsets();
  const { cuento } = route.params;
  const preguntas = cuento.preguntas;
  const { completarQuiz } = useProgreso();

  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [confirmada, setConfirmada] = useState(false);

  const pregunta = preguntas[actual];
  const esUltima = actual === preguntas.length - 1;

  const seleccionar = (i: number) => {
    if (!confirmada) setSeleccion(i);
  };
  const confirmar = () => {
    if (seleccion !== null) setConfirmada(true);
  };

  const siguiente = () => {
    const nuevasRespuestas = [...respuestas, seleccion ?? 0];
    if (esUltima) {
      let puntaje = 0;
      nuevasRespuestas.forEach((resp, i) => {
        if (resp === preguntas[i].respuesta_correcta)
          puntaje += preguntas[i].puntos;
      });
      completarQuiz(cuento.id, {
        scoreObtained: puntaje,
        totalScore: cuento.puntos_totales,
        answers: nuevasRespuestas,
      });
      navigation.reset({
        index: 1,
        routes: [
          {
            name: "Resultado",
            params: {
              cuento,
              respuestas: nuevasRespuestas,
              puntaje_obtenido: puntaje,
              puntaje_total: cuento.puntos_totales,
            },
          },
        ],
      });
    } else {
      setActual(actual + 1);
      setRespuestas(nuevasRespuestas);
      setSeleccion(null);
      setConfirmada(false);
    }
  };

  // Estilos dinámicos por opción
  const getOpcionStyle = (index: number) => {
    if (!confirmada) {
      return index === seleccion
        ? { bg: theme.colors.primary + "22", border: theme.colors.primary }
        : { bg: theme.colors.surface, border: theme.colors.border };
    }
    if (index === pregunta.respuesta_correcta)
      return { bg: theme.colors.success + "22", border: theme.colors.success };
    if (index === seleccion)
      return { bg: theme.colors.error + "22", border: theme.colors.error };
    return { bg: theme.colors.surface, border: theme.colors.border };
  };

  const getOpcionTextoColor = (index: number) => {
    if (!confirmada)
      return index === seleccion
        ? theme.colors.primaryLight
        : theme.colors.text;
    if (index === pregunta.respuesta_correcta) return theme.colors.success;
    if (index === seleccion) return theme.colors.error;
    return theme.colors.textMuted;
  };

  const esCorrecta = seleccion === pregunta.respuesta_correcta;

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Quiz</Text>
        <Text style={s.headerPuntos}>
          ⭐{" "}
          {preguntas
            .slice(0, actual)
            .reduce(
              (sum: number, p: Question, i: number) =>
                sum + (respuestas[i] === p.respuesta_correcta ? p.puntos : 0),
              0,
            )}{" "}
          pts
        </Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <StatusBarQuiz
          actual={actual}
          preguntas={preguntas}
          respuestas={respuestas}
        />

        {/* Pregunta */}
        <View style={s.preguntaBox}>
          <Text style={s.preguntaNumero}>Pregunta {actual + 1}</Text>
          <Text style={s.preguntaTexto}>{pregunta.pregunta}</Text>
          <Text style={s.puntosLabel}>Vale {pregunta.puntos} puntos</Text>
        </View>

        {/* Opciones */}
        <View style={s.opciones}>
          {pregunta.opciones.map((opcion: string, index: number) => {
            const { bg, border } = getOpcionStyle(index);
            return (
              <TouchableOpacity
                key={index}
                style={[s.opcion, { backgroundColor: bg, borderColor: border }]}
                onPress={() => seleccionar(index)}
              >
                <View style={[s.opcionLetra, { borderColor: border }]}>
                  <Text
                    style={[
                      s.opcionLetraTexto,
                      { color: getOpcionTextoColor(index) },
                    ]}
                  >
                    {["A", "B", "C", "D"][index]}
                  </Text>
                </View>
                <Text
                  style={[s.opcionTexto, { color: getOpcionTextoColor(index) }]}
                >
                  {opcion}
                </Text>
                {confirmada && index === pregunta.respuesta_correcta && (
                  <Text style={[s.checkmark, { color: theme.colors.success }]}>
                    ✓
                  </Text>
                )}
                {confirmada &&
                  index === seleccion &&
                  index !== pregunta.respuesta_correcta && (
                    <Text style={[s.checkmark, { color: theme.colors.error }]}>
                      ✗
                    </Text>
                  )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {confirmada && (
          <View
            style={[
              s.feedback,
              {
                backgroundColor: esCorrecta
                  ? theme.colors.success + "22"
                  : theme.colors.error + "22",
                borderColor: esCorrecta
                  ? theme.colors.success
                  : theme.colors.error,
              },
            ]}
          >
            <Text
              style={[
                s.feedbackTexto,
                {
                  color: esCorrecta ? theme.colors.success : theme.colors.error,
                },
              ]}
            >
              {esCorrecta
                ? `✅ ¡Correcto! +${pregunta.puntos} puntos`
                : `❌ Incorrecto. La respuesta era: ${
                    pregunta.opciones[pregunta.respuesta_correcta]
                  }`}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={[s.footer, { paddingBottom: insets.bottom + 20 }]}>
        {!confirmada ? (
          <TouchableOpacity
            style={[s.boton, seleccion === null && s.botonDeshabilitado]}
            onPress={confirmar}
            disabled={seleccion === null}
          >
            <Text style={s.botonTexto}>Confirmar respuesta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.boton} onPress={siguiente}>
            <Text style={s.botonTexto}>
              {esUltima ? "Ver resultados →" : "Siguiente pregunta →"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: 20, paddingBottom: 120 },
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
  headerPuntos: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.warning,
    fontWeight: "700",
  },
  preguntaBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 18,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  preguntaNumero: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  preguntaTexto: {
    fontSize: theme.fontSize.lg,
    fontWeight: "500",
    color: theme.colors.text,
    lineHeight: 26,
  },
  puntosLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginTop: 8,
  },
  opciones: { gap: 10 },
  opcion: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.borderRadius.md,
    padding: 14,
    gap: 12,
    borderWidth: 0.5,
  },
  opcionLetra: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  opcionLetraTexto: { fontWeight: "500", fontSize: theme.fontSize.sm },
  opcionTexto: { flex: 1, fontSize: theme.fontSize.md },
  checkmark: { fontSize: 16, fontWeight: "700" },
  feedback: {
    marginTop: 16,
    padding: 14,
    borderRadius: theme.borderRadius.md,
    borderWidth: 0.5,
  },
  feedbackTexto: {
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
    textAlign: "center",
  },
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
  botonDeshabilitado: { backgroundColor: theme.colors.border },
  botonTexto: { color: "#fff", fontWeight: "700", fontSize: theme.fontSize.md },
});
