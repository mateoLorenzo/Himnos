import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="hymn/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitle: "Atrás",
            headerShadowVisible: false,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
