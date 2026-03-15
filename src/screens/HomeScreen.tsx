import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useData } from "../hooks/useData";

export default function HomeScreen() {
  const { data, loading, error, refresh } = useData();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error?.message}</Text>
      </View>
    );
  }

  const cuentos = data?.cuentos ?? [];

  return (
    <FlatList
      data={cuentos}
      keyExtractor={(item) => item.id}
      onRefresh={refresh}
      refreshing={loading}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.categoria}>{item.categoria}</Text>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Text style={styles.tiempoLectura}>{item.tiempo_lectura}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", fontSize: 16 },
  card: {
    backgroundColor: "#1e1e1e",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  categoria: {
    color: "#0066FF",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  titulo: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descripcion: { color: "#e0e0e0", fontSize: 14, lineHeight: 20, marginTop: 4 },
  tiempoLectura: { color: "#888", fontSize: 12, marginTop: 8 },
});
