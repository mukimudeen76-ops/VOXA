import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Component, ReactNode, useEffect } from "react";
import { Text } from "react-native";

// Safety net: agar koi child component error throw kare (e.g. native view
// unavailable), app crash na ho — ek fallback UI dikhao.
class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("VOXA caught runtime error:", err?.message);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Text style={{ color: "#22D3EE", textAlign: "center", marginTop: 40, fontFamily: "monospace" }}>
          VOXA ek moment... thoda reload karo, boss!
        </Text>
      );
    }
    return this.props.children;
  }
}

SplashScreen.preventAutoHideAsync?.().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Antonio-Bold": require("../assets/fonts/Antonio-Bold.ttf"),
    "Antonio-Medium": require("../assets/fonts/Antonio-Medium.ttf"),
    "Antonio-Regular": require("../assets/fonts/Antonio-Regular.ttf"),
    "Antonio-SemiBold": require("../assets/fonts/Antonio-SemiBold.ttf"),
    "Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
  });

  useEffect(() => {
    // Fonts load ho jaye ya error aaye — dono case me splash hide karo,
    // taaki app kabhi hang/close na ho.
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppErrorBoundary>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppErrorBoundary>
  );
}
