// libraries
import { StyleSheet } from 'react-native';
import React from 'react';

// components
import { CustomIcon } from './CustomIcon';
import { ColorPalette } from '@styles/types';

export const MenuIcon = ({ color = 'secondary' }: { color?: ColorPalette }) => {
  return <CustomIcon name="bar-chart-2" style={styles.icon} color={color} size={30} />;
};

const styles = StyleSheet.create({
  icon: {
    transform: [{ rotateZ: '90deg' }, { rotateY: '180deg' }],
  },
});
