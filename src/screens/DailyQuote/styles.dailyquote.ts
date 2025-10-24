import { StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, spacing } from "../../constants/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    paddingTop: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
});
