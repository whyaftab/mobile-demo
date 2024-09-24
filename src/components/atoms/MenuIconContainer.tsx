// libraries
import { ColorPalette } from '@styles/types';
import React from 'react';
import { PressableProps, StyleSheet, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

// components
import { CustomPressable } from './CustomPressable';

interface MenuIconContainerProps extends Omit<PressableProps, 'style'> {
  mapBorder?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  size?: number;
  color?: ColorPalette;
}

export const MenuIconContainer: React.FC<MenuIconContainerProps> = ({
  children,
  mapBorder,
  size = 40,
  color,
  style,
  ...restProps
}) => {
  // variables
  const { colors } = useTheme();

  // returns
  return (
    <Container
      style={StyleSheet.flatten([
        {
          borderColor: mapBorder ? colors.porcelain : colors.alto,
          width: size,
          height: size,
          backgroundColor: color ? colors[color] : colors.white,
        },
        style,
      ])}
      {...restProps}>
      {children}
    </Container>
  );
};

const Container = styled(CustomPressable)(({ theme: { colors } }) => ({
  width: 40,
  height: 40,
  borderRadius: 8,
  borderColor: colors.alto,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));
