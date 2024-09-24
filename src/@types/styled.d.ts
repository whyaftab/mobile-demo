// import original module declarations
import { theme } from "@styles/themes";
import "styled-components/native";

// extend them
declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: (typeof theme)["colors"];
    layout: (typeof theme)["layout"];
  }
}
