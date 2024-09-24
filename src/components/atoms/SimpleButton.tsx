// libraries
import React from "react";
import styled from "styled-components/native";
import { genericStyles } from "@styles/genericStyles";

// components
import { CustomPressable, CustomPressableProps } from "./CustomPressable";
import { CustomText } from "./CustomText";

// types
export interface SimpleButtonProps extends CustomPressableProps {
  title: string;
  onPress?: () => void;
}

export const SimpleButton = ({ title, onPress }: SimpleButtonProps) => {
  // renders
  return (
    <Button pressableStyle={{ flex: 1 }} onPress={onPress}>
      <CustomText color="primary">{title}</CustomText>
    </Button>
  );
};

const Button = styled(CustomPressable)(({ theme: { colors, layout } }) => ({
  ...genericStyles.jcAiCenter,
  backgroundColor: colors.pictonBlue,
  padding: layout.padding_x1,
  borderRadius: 10,
  height: 40,
}));
