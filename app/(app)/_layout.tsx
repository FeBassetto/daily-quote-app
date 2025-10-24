import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        animationDuration: 200,
      }}
    />
  );
};

export default AppLayout;
