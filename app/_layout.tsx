
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/store/AuthStore";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/main";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/page1");
    }
  }, [isAuthenticated, segments]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="page1" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
        <RootLayoutNav />
    </AuthProvider>
  );
}
