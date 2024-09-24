// libraries
import React, { useMemo } from "react";
import { Image } from "react-native";
import styled, { useTheme } from "styled-components/native";

// components
import {
  CustomImage,
  CustomPressable,
  CustomText,
  SpacerColumn,
  SpacerRow,
} from "@components/atoms";

// misc
import CarrotRightSVG from "@assets/icons/carrot-right.svg";
import { genericStyles } from "@styles/genericStyles";
import { Article, ArticleType } from "@api/types";

// types
export interface ContentCardProps extends Article {
  onPress?(): void;
}

const MAX_CHARACTER_LENGTH = 180;

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  content,
  image_url,
  onPress,
  podcast_embed,
  video_embed,
  type,
}) => {
  // variables
  const { layout } = useTheme();
  const imageSize =
    ((layout.window.width > 400 ? 400 : layout.window.width) -
      layout.padding_x4 * 2 -
      layout.padding_x2 * 2) *
    0.4;
  const actionText = useMemo(() => {
    if (podcast_embed) {
      return "Listen";
    } else if (video_embed) {
      return "Watch";
    } else if (type === ArticleType.Recipe) {
      return "Read Recipe";
    } else {
      return "Read Article";
    }
  }, [podcast_embed, video_embed]);

  // functions

  // renders
  return (
    <Container onPress={onPress} minHeight={imageSize + layout.padding_x2 * 2}>
      <CustomImage
        source={{ uri: image_url }}
        style={{ width: imageSize, height: imageSize }}
      />
      <SpacerRow size={2} />
      <ContentSection>
        <CustomText font="bodyBold">{title}</CustomText>

        <SpacerColumn size={1} />

        <CustomText size={12}>
          {content &&
            content
              .replace(/<[^>]*>?/gm, "")
              ?.substring(0, MAX_CHARACTER_LENGTH - title.length) + "..."}
        </CustomText>

        <SpacerColumn size={1} />
        <ReadArticleContainer>
          <CustomText font="bodyBold" size={12}>
            {actionText}
          </CustomText>
          <SpacerRow size={0.5} />
          <CarrotRightSVG width={16} height={16} />
        </ReadArticleContainer>
      </ContentSection>
    </Container>
  );
};

const Container = styled(CustomPressable)<{ minHeight: number }>(
  ({ theme: { colors, layout }, minHeight }) => ({
    ...genericStyles.rowWithCenter,
    flex: 1,
    padding: layout.padding_x2,
    backgroundColor: colors.primaryBackground,
    borderRadius: 20,
    minHeight,
  })
);

const ContentSection = styled.View(({ theme: { colors, layout } }) => ({
  flex: 1,
}));

const ReadArticleContainer = styled.View(({ theme: { colors, layout } }) => ({
  ...genericStyles.rowWithCenter,
  ...genericStyles.w100,
  justifyContent: "flex-end",
}));
