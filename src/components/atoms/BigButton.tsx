// libraries
import React, { ReactElement, ReactNode, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Easing, TextStyle } from "react-native";
import styled, { useTheme } from "styled-components/native";

// components
import { CustomPressable } from "./CustomPressable";

// styles
import { fonts } from "@styles/fonts";
import { ColorPalette } from "@styles/types";
import { genericStyles } from "@styles/genericStyles";

// types
interface BigButtonProps extends ContainerProps {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  titleStyle?: TextStyle;
  progress?: number;
}

export const BigButton = ({
  text,
  onPress,
  outline = false,
  isLoading = false,
  isDisabled = false,
  leftIcon,
  titleStyle,
  color,
  width,
  minWidth,
  progress,
}: BigButtonProps): ReactElement => {
  // variables
  const widthProgressAnim = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const colorHex = theme.colors[color] || theme.colors.text;

  // hooks
  useEffect(() => {
    Animated.timing(widthProgressAnim, {
      toValue: progress,
      duration: 100,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  // renders
  return (
    <Container
      color={colorHex}
      onPress={onPress}
      isDisabled={isLoading || isDisabled}
      outline={outline}
      width={width}
      minWidth={minWidth}
    >
      <ProgressOverlay
        style={{
          width: widthProgressAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
        }}
      />
      {!!leftIcon === true && <Icon>{leftIcon}</Icon>}
      {isLoading ? (
        <ActivityIndicator
          color={
            outline
              ? colorHex || theme.colors.primary
              : theme.colors.primaryBackground
          }
          animating={isLoading}
        />
      ) : (
        <Title outline={outline} style={titleStyle} color={colorHex}>
          {text}
        </Title>
      )}
    </Container>
  );
};

interface ContainerProps {
  outline?: boolean;
  isDisabled?: boolean;
  color?: ColorPalette;
  width?: number | string;
  minWidth?: number | string;
}

const Container = styled(CustomPressable)<ContainerProps>(
  ({
    outline,
    color,
    width,
    minWidth,
    theme: { colors, layout },
    isDisabled,
  }) => ({
    background: outline ? colors.white : color || colors.primary,
    minHeight: layout.buttons.height,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: outline ? 1 : 0,
    borderColor: outline ? color || colors.primary : colors.transparent,
    alignSelf: "stretch",
    opacity: isDisabled ? 0.4 : 1,
    borderRadius: 50,
    width,
    minWidth,
    overflow: "hidden",
  })
);

const Title = styled.Text<Omit<ContainerProps, "isDisabled">>(
  ({ outline, color, theme: { colors } }) => ({
    color: outline ? color || colors.primary : colors.primaryBackground,
    fontFamily: fonts.family.bodyMedium,
    fontSize: 18,
    textAlign: "center",
  })
);

const Icon = styled.View(({ theme: { layout } }) => ({
  marginRight: layout.padding_x1_5,
}));

const ProgressOverlay = styled(Animated.View)(({ theme: { colors } }) => ({
  ...genericStyles.positionAbsolute,
  ...genericStyles.h100,
  left: 0,
  backgroundColor: colors.secondary,
}));
