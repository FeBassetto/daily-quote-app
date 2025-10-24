import { StyleSheet } from "react-native";
import { colors } from "@/src/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 48,
  },
  spinner: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerArc: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: colors.primary,
    borderRightColor: colors.primary,
  },
});
