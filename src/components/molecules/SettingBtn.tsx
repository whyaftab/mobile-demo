// libraries
import React from "react";
import styled from "styled-components/native";

// components
import { CustomPressable, CustomText, DivColumn } from "@components/atoms";

// misc
import { genericStyles } from "@styles/genericStyles";

// types
export type SettingBtnProps = {
  title: string;
  onPress?(): void;
};

export const SettingBtn: React.FC<SettingBtnProps> = ({ title, onPress }) => {
  // variables

  // functions

  // renders
  return (
    <Container onPress={onPress}>
      <DivColumn />
      <CustomText font="bodyLight">{title}</CustomText>
      <DivColumn />
    </Container>
  );
};

const Container = styled(CustomPressable)(({ theme: { colors, layout } }) => ({
  ...genericStyles.rowWithCenter,
  backgroundColor: colors.primary,
  borderRadius: 6,
  marginBottom: layout.padding_x2,
  paddingVertical: layout.padding_x1,
  paddingHorizontal: layout.padding_x2,
  justifyContent: "space-between",
}));
