// libraries
import React from "react";

// components
import {
  CustomIcon,
  CustomPressable,
  CustomText,
  SpacerColumn,
} from "@components/atoms";
import { genericStyles } from "@styles/genericStyles";

// misc

// types
export type ChangeIconProps = {
  onPress?: () => void;
};

export const ChangeIcon: React.FC<ChangeIconProps> = ({ onPress }) => {
  // variables

  // functions

  // renders
  return (
    <CustomPressable onPress={onPress} style={genericStyles.jcAiCenter}>
      <CustomIcon
        name="pen-square"
        type="fontawesome"
        size={24}
        color="secondary"
      />
      <SpacerColumn size={0.5} />
      <CustomText size={10}>Change</CustomText>
    </CustomPressable>
  );
};
