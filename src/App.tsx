import { StatusBar, useColorScheme } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <HomeScreen />
    </SafeAreaProvider>
  );
}

export default App;
