// libraries
import React from "react";
import styled, { useTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import { SpacerRow } from "./Spacer";
import { CustomText } from "./CustomText";

// styles
import { genericStyles } from "@styles/genericStyles";
import { CustomPressable } from "./CustomPressable";

type RadioButtonProps = {
  value: boolean;
  label?: string;
  onPress?(): void;
};

export const RadioButton = ({ value, label, onPress }: RadioButtonProps) => {
  // variables
  const { colors } = useTheme();

  // returns
  return (
    <Container onPress={onPress}>
      <Ionicons
        name={value ? "radio-button-on" : "radio-button-off"}
        color={value ? colors.primary : colors.snuf}
        size={14}
      />
      <SpacerRow size={2} />
      <CustomText size={14} color="primary">
        {label}
      </CustomText>
    </Container>
  );
};

const Container = styled(CustomPressable)({
  ...genericStyles.rowWithCenter,
});
