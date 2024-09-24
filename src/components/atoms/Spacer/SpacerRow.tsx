import { layout } from '@styles/layout';
import React from 'react';
import { View } from 'react-native';

import { SpacerProps } from './SpacerColumn';

export const SpacerRow: React.FC<SpacerProps> = ({ size }) => (
  <View
    style={{
      width: layout.padding_x1 * size,
    }}
  />
);
