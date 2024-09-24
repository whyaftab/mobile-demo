// libraries
import { ColorPalette } from '@styles/types';
import React from 'react';
import styled from 'styled-components/native';

interface DividerProps {
  color: ColorPalette;
  opacity?: number;
}

export const Divider: React.FC<DividerProps> = ({ color, opacity }) => {
  // renders
  return <DividerContainer style={{ backgroundColor: color, opacity }} />;
};

const DividerContainer = styled.View(({ theme: { colors } }) => ({
  height: 1,
  width: '100%',
  backgroundColor: colors.primaryBackground,
}));
