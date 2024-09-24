// misc
import { layout } from "./layout";

/**
 * to add transparency to an hexa color, see this
 * https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
 */

export const theme = {
  colors: {
    // main
    primary: "#FFFFFF",
    get primary50() {
      return this.primary + 80;
    },
    secondary: "#15484B",
    primaryBackground: "#FFFFFF",
    secondaryBackground: "#F0F0F0",
    success: "#78D64B",
    error: "#F9423A",
    warning: "#FF9E1C",
    gray: "#808080",
    silver: "#A5A5A5",
    white: "#FFFFFF",
    alto: "#CECECE",
    snuf: "#D6CDE4",
    porcelain: "#F4F5F6",
    mineShaft: "#1F1F1F",
    boulder: "#7A7474",
    cornflowerBlue: "#D7F7FA",
    mercury: "#E6E6E6",
    bridalHeath: "#FFFDF9",
    dainTree: "#002B3E",
    concrete: "#F3F3F3",
    pictonBlue: "#2D9BF0",

    // other
    text: "#1A1A1A",
    get text50() {
      return this.text + 80;
    },
    transparent: "transparent",
  },
  layout: { ...layout },
};
