import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useData } from "../hooks/useData";
import { theme } from "../theme";
import { getPerfilUser } from "../services";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StoryCard } from "./components/StoryCard";
import { useProgreso } from "../hooks/useProgreso";
import { HeaderUser } from "./components/HeaderUser";
import { PerfilUser } from "../types";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { data, loading, error, refresh } = useData();
  const { progreso, puntajeGlobal, refrescar } = useProgreso();
  const [perfil, setPerfil] = useState<PerfilUser | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getPerfilUser().then((perfil) => {
      if (perfil) {
        setPerfil(perfil);
        refrescar();
      }
    });
  }, []);

  if (loading && data?.cuentos.length === 0) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={s.cargandoTexto}>Cargando cuentos...</Text>
      </View>
    );
  }

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <FlatList
        data={data?.cuentos}
        keyExtractor={(item) => item.id}
        onRefresh={refresh}
        refreshing={loading}
        contentContainerStyle={s.lista}
        ListHeaderComponent={
          <View>
            <HeaderUser perfil={perfil} puntajeGlobal={puntajeGlobal} />
            {error && <Text style={s.errorAviso}>⚠️ {error.message}</Text>}
            <Text style={s.seccion}>Todos los cuentos</Text>
          </View>
        }
        renderItem={({ item }) => (
          <StoryCard
            item={item}
            navigation={navigation}
            progreso={progreso.stories?.[item.id] ?? undefined}
          />
        )}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  cargandoTexto: { color: theme.colors.textMuted, marginTop: 12 },
  lista: { paddingBottom: 40 },
  cacheAviso: {
    color: theme.colors.warning,
    fontSize: theme.fontSize.xs,
    marginBottom: 8,
    textAlign: "center",
  },
  errorAviso: {
    color: theme.colors.error,
    fontSize: theme.fontSize.xs,
    marginBottom: 8,
    textAlign: "center",
  },
  seccion: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
    marginVertical: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 18,
    marginBottom: 16,
    ...theme.neo,
  },
});
