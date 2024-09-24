// libraries
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

// logo
import LogoSvg from "@assets/images/logo.svg";

export type LogoProps = {
  size?: "small" | "medium";
};

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  // variables
  const height = useMemo(() => {
    switch (size) {
      case "medium":
        return 60;

      default:
        return 40;
    }
  }, [size]);

  // renders
  return <LogoSvg style={styles.image} height={height} width={140} />;
};

const styles = StyleSheet.create({
  image: {},
});
