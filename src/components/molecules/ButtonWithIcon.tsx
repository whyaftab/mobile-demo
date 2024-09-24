// libraries
import React from "react";
import styled from "styled-components/native";
import FeatherIcon from "@expo/vector-icons/Feather";

// components
import {
  CustomIcon,
  CustomPressable,
  CustomText,
  SpacerRow,
} from "@components/atoms";

// misc
import { genericStyles } from "@styles/genericStyles";

// types
export interface ButtonWithIconProps {
  iconName: IconNames;
  text: string;
  isEnabled?: boolean;
  onPress?(): void;
}

export type IconNames = keyof typeof FeatherIcon.glyphMap;

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  iconName: name,
  text,
  isEnabled,
  onPress,
}) => {
  // variables

  // functions

  // renders
  return (
    <Container onPress={onPress} isEnabled={isEnabled}>
      <CustomIcon
        name={name}
        size={14}
        color={isEnabled ? "secondary" : "primary"}
      />
      <SpacerRow size={0.5} />
      <CustomText size={12} color={isEnabled ? "secondary" : "primary"}>
        {text}
      </CustomText>
    </Container>
  );
};

const Container = styled(CustomPressable)<{ isEnabled?: boolean }>(
  ({ theme: { colors, layout }, isEnabled }) => ({
    ...genericStyles.rowWithCenter,
    backgroundColor: isEnabled ? colors.transparent : colors.secondary,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: layout.padding_x1,
    paddingVertical: layout.padding_x0_5,
    borderRadius: 10,
  })
);
