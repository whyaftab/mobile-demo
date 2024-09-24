// libraries
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { useWindowDimensions } from "react-native";

// misc
import { CustomPressable, CustomText } from "@components/atoms";
import { genericStyles } from "@styles/genericStyles";

// types
export type HomeTileProps = {
  title: string;
  onPress: () => void;
};

export const HomeTile: React.FC<HomeTileProps> = ({ title, onPress }) => {
  // variables
  const { width } = useWindowDimensions();
  const { layout } = useTheme();
  const responsiveWidth = width / 3 - layout.padding_x4;

  // functions

  // renders
  return (
    <Container>
      <CustomPressable
        onPress={onPress}
        pressableStyle={[genericStyles.fill, genericStyles.jcAiCenter]}
        style={{ width: responsiveWidth }}
      >
        <CustomText color="white" font="bodyBold" size={16} textAlign="center">
          {title}
        </CustomText>
      </CustomPressable>
    </Container>
  );
};

const Container = styled.View(({ theme: { colors } }) => ({
  backgroundColor: colors.secondary,
  height: 136,
}));
