// libraries
import React from "react";
import styled from "styled-components/native";

// components
import { CustomPressable } from "./CustomPressable";
import { CustomText } from "./CustomText";

// misc

// types
export type TagButtonProps = {
  text: string;
  onPress?: () => void;
};

export const TagButton: React.FC<TagButtonProps> = ({ text, onPress }) => {
  // variables

  // functions

  // renders
  return (
    <TaggedBtn onPress={onPress}>
      <CustomText color="primary" size={12}>
        {text}
      </CustomText>
    </TaggedBtn>
  );
};

const TaggedBtn = styled(CustomPressable)(({ theme: { colors, layout } }) => ({
  borderRadius: 10,
  backgroundColor: colors.dainTree,
  paddingHorizontal: layout.padding_x1,
  paddingVertical: layout.padding_x0_5,
}));
