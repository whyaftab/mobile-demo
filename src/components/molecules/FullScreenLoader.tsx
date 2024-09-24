// libraries
import React from "react";
import { View, ViewStyle } from "react-native";
import { EmptyList } from "./EmptyList";
import styled from "styled-components/native";

// components
import { Loading, CustomIcon, SpacerColumn } from "../atoms";

// misc

// styles
import { genericStyles } from "@styles/genericStyles";

const FullScreenContainer = styled.View(({ theme: { colors } }) => ({
  ...genericStyles.fullContentCenter,
  backgroundColor: colors.primaryBackground,
  position: "absolute",
}));

export const FullScreenLoader = ({
  isLoading,
  children,
  style,
  errorText,
  onRefresh,
}: {
  isLoading?: boolean;
  children?: React.ReactElement | null;
  style?: ViewStyle;
  errorText?: string;
  onRefresh?: () => void;
}): React.ReactElement | null => {
  // returns
  if (errorText && !isLoading) {
    return (
      <EmptyList text={errorText}>
        {onRefresh !== undefined ? (
          <View>
            <SpacerColumn size={0.5} />
            <CustomIcon
              name="refresh-ccw"
              onPress={onRefresh}
              color="secondary"
              width={30}
              height={30}
            />
          </View>
        ) : null}
      </EmptyList>
    );
  }

  if (children && !isLoading) {
    return children;
  }

  if (isLoading) {
    return (
      <FullScreenContainer style={style}>
        <Loading size="large" />
      </FullScreenContainer>
    );
  }

  return null;
};
