// libraries
import React from "react";
import styled from "styled-components/native";

// components
import { CustomText } from "./CustomText";

// misc
import { genericStyles } from "@styles/genericStyles";

// types
export type EtcFooterProps = {};

export const EtcFooter: React.FC<EtcFooterProps> = ({}) => {
  // variables

  // functions

  // renders
  return <Container></Container>;
};

const Container = styled.View(({ theme: { colors, layout } }) => ({
  ...genericStyles.jcAiCenter,
  paddingVertical: layout.padding_x3,
}));
