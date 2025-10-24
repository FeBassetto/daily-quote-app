import { StyleSheet } from "react-native";
import { colors, fontSize, fontWeight } from "../../constants/theme";

export const styles = StyleSheet.create({
  logo: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
    textAlign: "center",
  },
  small: {
    fontSize: fontSize.xl,
  },
  medium: {
    fontSize: fontSize.xxl,
  },
  large: {
    fontSize: fontSize.xxxl,
  },
});
