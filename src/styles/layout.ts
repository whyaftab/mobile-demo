// libraries
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const layout = {
  window: { width, height },
  screen: { width: screenWidth, height: screenHeight },
  padding: 32,
  buttons: {
    height: 54,
  },
  shadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  contentPadding: 8,
  padding_x1: 8,
  get padding_x0_5() {
    return this.padding_x1 * 0.5;
  },
  get padding_x1_5() {
    return this.padding_x1 * 1.5;
  },
  get padding_x2() {
    return this.padding_x1 * 2;
  },
  get padding_x2_5() {
    return this.padding_x1 * 2.5;
  },
  get padding_x3() {
    return this.padding_x1 * 3;
  },
  get padding_x3_5() {
    return this.padding_x1 * 3.5;
  },
  get padding_x4() {
    return this.padding_x1 * 4;
  },
  get padding_x4_5() {
    return this.padding_x1 * 4.5;
  },
  get padding_x5() {
    return this.padding_x1 * 5;
  },
  get padding_x5_5() {
    return this.padding_x1 * 5.5;
  },
};
