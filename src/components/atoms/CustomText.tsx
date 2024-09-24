// libraries
import React from 'react';
import styled from 'styled-components/native';
import { TextProps } from 'react-native';

// misc
import { ColorPalette } from '@styles/types';
import { fonts } from '@styles/fonts';
import { getColorByPallete } from '@utils/color';

// types
export type Sizes = number;

type TextAlign = 'left' | 'right' | 'center';

export interface CustomTextProps extends TextProps {
  size?: number;
  font?: keyof typeof fonts.family;
  color?: ColorPalette;
  center?: boolean;
  textAlign?: TextAlign;
  opacity?: number;
  exactLineHeight?: boolean;
}

export const CustomText: React.FC<CustomTextProps> = ({
  size = 14,
  color = 'text',
  children,
  center = false,
  textAlign = 'left',
  opacity,
  font = 'bodyRegular',
  ...restProps
}) => {
  return (
    <StyledText
      size={size}
      color={color}
      center={center}
      textAlign={textAlign}
      opacity={opacity}
      font={font}
      {...restProps}>
      {children}
    </StyledText>
  );
};

const getFontSize = (size: Sizes) => {
  return `${size}px`;
};

export const getLineHeight = (size: Sizes) => {
  return `${size + 4}px`;
};

interface StyledTextProps {
  size: Sizes;
  color: ColorPalette;
  center: boolean;
  textAlign: TextAlign;
  opacity?: number;
  font: keyof typeof fonts.family;
  exactLineHeight?: boolean;
}

const StyledText = styled.Text<StyledTextProps>(
  ({ center, color, size, font, theme, textAlign, opacity, exactLineHeight }) => ({
    fontFamily: fonts.family[font],
    fontSize: getFontSize(size),
    color: getColorByPallete(color, theme),
    textAlign: center ? 'center' : textAlign,
    lineHeight: exactLineHeight ? size : getLineHeight(size),
    opacity,
  }),
);
