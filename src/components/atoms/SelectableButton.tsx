// libraries
import React from "react";
import styled from "styled-components/native";

// components
import { CustomText } from "./CustomText";
import { CustomPressable } from "./CustomPressable";

// misc
import { genericStyles } from "@styles/genericStyles";

// types
export type SelectableButtonProps = {
  title: string;
  isSelected?: boolean;
  onPress?: () => void;
};

export const SelectableButton: React.FC<SelectableButtonProps> = ({
  title,
  isSelected,
  onPress,
}) => {
  // variables

  // renders
  return (
    <Container isSelected={isSelected} onPress={onPress}>
      <CustomText color={isSelected ? "primary" : "secondary"}>
        {title}
      </CustomText>
    </Container>
  );
};

const Container = styled(CustomPressable)<{ isSelected?: boolean }>(
  ({ theme: { colors, layout }, isSelected }) => ({
    ...genericStyles.w100,
    ...genericStyles.aiCenter,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: isSelected ? colors.secondary : colors.transparent,
    padding: layout.padding_x1,
  })
);
