// libraries
import { ViewStyle } from "react-native";
import styled from "styled-components/native";

interface CommonProps extends ViewStyle {
  jc?: ViewStyle["justifyContent"];
  ai?: ViewStyle["alignItems"];
}

const DivRow = styled.View<CommonProps>(({ jc, ai, flex, height }) => ({
  flexDirection: "row",
  justifyContent: jc,
  alignItems: ai || "center",
  flex,
  height,
}));

const DivColumn = styled.View<CommonProps>(({ jc, ai, flex, height }) => ({
  flexDirection: "column",
  justifyContent: jc,
  alignItems: ai,
  flex,
  height,
}));

export { DivRow, DivColumn };
