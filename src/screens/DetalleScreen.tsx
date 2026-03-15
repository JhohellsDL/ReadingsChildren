import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { theme } from "../theme";
import type { RootStackParamList } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DetailStoryInfo } from "./components/DetailStoryInfo";
import { ImageStory } from "./components/ImageStory";
import { FooterDetail } from "./components/FooterDetail";
import { useProgreso } from "../hooks/useProgreso";

export type DetalleScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Detalle">;
  route: RouteProp<RootStackParamList, "Detalle">;
};

export const DetalleScreen = ({ navigation, route }: DetalleScreenProps) => {
  const insets = useSafeAreaInsets();
  const { cuento } = route.params;
  const { progreso } = useProgreso();

  const handleReadStory = () => navigation.navigate("Lector", { cuento });
  const handleCompleteQuiz = () => navigation.navigate("Quiz", { cuento });

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backIcon}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo} numberOfLines={1}>
          {cuento.titulo}
        </Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <ImageStory cuento={cuento} />
        <DetailStoryInfo cuento={cuento} progreso={progreso} />
      </ScrollView>

      <FooterDetail
        cuento={cuento}
        progreso={progreso}
        screen="Detalle"
        onReadStory={handleReadStory}
        onCompleteQuiz={handleCompleteQuiz}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { paddingBottom: 120 },

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
});
