// libraries
import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "styled-components/native";

export const Loading: React.FC<ActivityIndicatorProps> = (props) => {
  const { colors } = useTheme();
  return <ActivityIndicator color={colors.secondary} {...props} />;
};
