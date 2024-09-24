// libraries
import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { useWindowDimensions } from "react-native";

// components
import { CustomImage, CustomPressable, CustomText } from "@components/atoms";

// misc
import { genericStyles } from "@styles/genericStyles";
import { MainDataCategory } from "@api/types";

// types
export interface HomeCategoryProps extends MainDataCategory {
  onPress?(): void;
}
const MAX_FONT_HEIGHT = 28.5; // change it to 28.5 on release
export const HomeCategory: React.FC<HomeCategoryProps> = ({
  name,
  image_url,
  onPress,
}) => {
  // variables
  const { layout } = useTheme();
  const { width } = useWindowDimensions();
  const imageWidth = width / 3 - layout.padding_x4;
  const responsiveWidth = width / 3 - layout.padding_x4;
  const [fontSize, setFontSize] = useState(10);

  // functions

  // renders
  return (
    <CustomPressable style={{ width: responsiveWidth }} onPress={onPress}>
      <CustomImage
        source={{ uri: image_url }}
        style={{ width: imageWidth, height: 80 }}
        resizeMode="cover"
      />

      <HeadingContainer width={imageWidth}>
        <CustomText
          font="museno"
          size={fontSize}
          color="primary"
          textAlign="center"
          onLayout={(event) => {
            if (event.nativeEvent.layout.height > MAX_FONT_HEIGHT) {
              setFontSize(fontSize - 1);
            }
          }}
        >
          {name}
        </CustomText>
      </HeadingContainer>
    </CustomPressable>
  );
};

const HeadingContainer = styled.View<{ width: number }>(
  ({ theme: { colors, layout }, width }) => ({
    ...genericStyles.jcAiCenter,
    paddingVertical: layout.padding_x1_5,
    paddingHorizontal: layout.padding_x0_5,
    backgroundColor: colors.secondary,
    width,
    minHeight: 56,
  })
);
