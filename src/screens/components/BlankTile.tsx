// libraries
import React from "react";
import { useWindowDimensions } from "react-native";
import styled, { useTheme } from "styled-components/native";

// misc

// types
export const BlankTile = () => {
  // variables
  const { layout } = useTheme();
  const { width } = useWindowDimensions();
  const responsiveWidth = width / 3 - layout.padding_x4;

  // functions

  // renders
  return <Container style={{ width: responsiveWidth }}></Container>;
};

const Container = styled.View(({}) => ({
  height: 116,
}));
