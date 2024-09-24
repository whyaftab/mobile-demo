// libraries
import React from "react";
import styled from "styled-components/native";

// components
import { CustomIcon, CustomPressable, CustomText } from "@components/atoms";

// misc
import { genericStyles } from "@styles/genericStyles";

// types
export type RelatedBtnProps = {
  title: string;
  onPress?(): void;
};

export const RelatedBtn: React.FC<RelatedBtnProps> = ({ title, onPress }) => {
  // variables

  // renders
  return (
    <Container onPress={onPress}>
      <CustomText>{title}</CustomText>

      <CustomIcon name="chevron-right" type="feather" color="text" />
    </Container>
  );
};

const Container = styled(CustomPressable)(({ theme: { colors, layout } }) => ({
  ...genericStyles.rowWithCenter,
  justifyContent: "space-between",
  background: colors.concrete,
  padding: layout.padding_x2,
  borderRadius: 10,
}));
