import { Image, StyleSheet, Text, View } from "react-native";
import { Story } from "../../types/story";
import { theme } from "../../theme";

export const ImageStory = ({ cuento }: { cuento: Story }) => {
  return (
    <View>
      {cuento.imagen ? (
        <Image
          source={{ uri: cuento.imagen }}
          style={s.imagen}
          resizeMode="cover"
        />
      ) : (
        <View style={s.imagenPlaceholder}>
          <Text style={s.imagenEmoji}>📖</Text>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  imagen: { width: "100%", height: 220, marginTop: 12 },
  imagenPlaceholder: {
    width: "100%",
    height: 220,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  imagenEmoji: { fontSize: 72 },
});
