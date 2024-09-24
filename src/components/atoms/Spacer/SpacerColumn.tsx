import { layout } from '@styles/layout';
import React from 'react';
import { View } from 'react-native';

export type SpacerProps = {
  size: number;
};

export const SpacerColumn: React.FC<SpacerProps> = ({ size }) => (
  <View
    style={{
      height: layout.padding_x1 * size,
    }}
  />
);
