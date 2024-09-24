import { ColorPalette } from '@styles/types';
import { DefaultTheme } from 'styled-components/native';

export const getColorByPallete = (color: ColorPalette, theme: DefaultTheme) => {
  return theme.colors[color];
};

export const withAlpha = (color: string, opacity: number) => {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};
