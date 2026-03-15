import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { theme } from "../theme";
import { setPerfilUser } from "../services";

export const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleContinuar = async () => {
    if (name.trim().length < 2) {
      setError("Escribe al menos 2 caracteres");
      return;
    }

    await setPerfilUser({
      name: name.trim(),
      creationDate: new Date().toISOString(),
    });

    navigation.replace("Home");
  };

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={s.hero}>
        <Text style={s.emoji}>📚</Text>
        <Text style={s.titulo}>LeerUp</Text>
        <Text style={s.subtitulo}>Tu biblioteca personal de cuentos</Text>
      </View>

      <View style={s.card}>
        <Text style={s.label}>¿Cómo te llamas?</Text>
        <TextInput
          style={s.input}
          placeholder="Tu nombre..."
          placeholderTextColor={theme.colors.textMuted}
          value={name}
          onChangeText={(t) => {
            setName(t);
            setError("");
          }}
          maxLength={30}
        />
        {error ? <Text style={s.error}>{error}</Text> : null}

        <TouchableOpacity style={s.boton} onPress={handleContinuar}>
          <Text style={s.botonTexto}>Empezar a leer →</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: 24,
  },
  hero: { alignItems: "center", marginBottom: 40 },
  emoji: { fontSize: 64, marginBottom: 12 },
  titulo: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "800",
    color: theme.colors.text,
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    marginTop: 6,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 24,
    ...theme.neo,
  },
  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: 14,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    marginTop: 6,
  },
  boton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  botonTexto: { color: "#fff", fontWeight: "700", fontSize: theme.fontSize.md },
});
