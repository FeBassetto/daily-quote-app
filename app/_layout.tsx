import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { colors } from "@/src/constants/theme";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { useAuth } from "@/src/hooks/useAuth";
import { LoadingScreen } from "@/src/screens/Loading/Loading";

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootNavigator />
      <Toast />
    </AuthProvider>
  );
};

const RootNavigator = () => {
  const { isAuthenticated, isLoading, isTransitioning } = useAuth();

  if (isLoading || isTransitioning) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(app)"
          options={{
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="(auth)"
          options={{
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
