// libraires
import React from "react";
import styled from "styled-components/native";

// components
import { Logo } from "@components/atoms";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const StickyHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Container notchPadding={top}>
      <Logo />
    </Container>
  );
};

const Container = styled.View<{ notchPadding: number }>(
  ({ theme: { colors, layout }, notchPadding }) => ({
    backgroundColor: colors.secondary,
    paddingBottom: layout.padding_x2_5,
    alignItems: "center",
    paddingTop: layout.padding_x1 + notchPadding,
  })
);
