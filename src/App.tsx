import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { getPerfilUser } from "./services";
import { DetalleScreen } from "./screens/DetalleScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LectorScreen } from "./screens/LectorScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { ResultadoScreen } from "./screens/ResultadoScreen";
import { SplashScreen } from "./screens/SplashScreen";
import { theme } from "./theme";
import type { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [profileExists, setProfileExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPerfil = async () => {
      const perfil = await getPerfilUser();
      setProfileExists(perfil ? true : false);
    };
    checkPerfil();
  }, []);

  if (profileExists === null) return null;

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />
      <Stack.Navigator
        initialRouteName={profileExists ? "Home" : "Splash"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detalle" component={DetalleScreen} />
        <Stack.Screen name="Lector" component={LectorScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
