import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { Logo } from "@/src/components/Logo/Logo";
import { styles } from "./styles.loading";

export const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Animated values from useRef.current are stable and don't need to be in deps
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Logo size="large" />
      </Animated.View>

      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <View style={styles.spinnerArc} />
      </Animated.View>
    </View>
  );
};
