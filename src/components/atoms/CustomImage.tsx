// libraries
import React from "react";
import { ImageProps } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import styled from "styled-components/native";

// misc
import PlaceHolderImg from "@assets/images/adaptive-icon.png";

// types
export interface CustomImageProps extends ImageProps {}

export const CustomImage: React.FC<ImageProps> = ({ source, ...restProps }) => {
  // variables
  const { isConnected } = useNetInfo();

  // functions

  // renders
  return (
    <StyledImage
      isConnected={isConnected}
      source={isConnected ? source : PlaceHolderImg}
      {...restProps}
    />
  );
};

const StyledImage = styled.Image<{ isConnected: boolean }>(
  ({ theme: { colors }, isConnected }) => ({
    backgroundColor: !isConnected ? colors.text : colors.transparent,
  })
);
