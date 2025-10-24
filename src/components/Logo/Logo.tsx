import type React from "react";
import type { ViewStyle } from "react-native";
import LogoSvg from "../../assets/images/logo.svg";

interface LogoProps {
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
}

const sizeMap = {
  small: { width: 80, height: 18 },
  medium: { width: 120, height: 28 },
  large: { width: 160, height: 37 },
} as const;

export const Logo: React.FC<LogoProps> = ({ size = "medium", style }) => {
  const { width, height } = sizeMap[size];

  return <LogoSvg width={width} height={height} style={style} />;
};
