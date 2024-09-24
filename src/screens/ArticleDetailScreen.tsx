// libraries
import React, { useEffect, useMemo } from "react";
import { Image, useWindowDimensions } from "react-native";
import styled, { useTheme } from "styled-components/native";
import RenderHTML from "react-native-render-html";
import { RouteProp, useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";

// components
import {
  CustomImage,
  CustomText,
  DivColumn,
  DivRow,
  SpacerColumn,
  SpacerRow,
  TagButton,
} from "@components/atoms";
import { ButtonWithIcon } from "@components/molecules";
import { RelatedBtn } from "./components/RelatedBtn";

// misc
import { genericStyles } from "@styles/genericStyles";
import { HomeStackParamList, useHomeNavigation } from "@utils/navigation";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  selectIsArticleLiked,
  selectArticleById,
  selectArticlesByIdsAndType,
  selectIsArticleBookmarked,
  selectOrganizationId,
} from "./appSelectors";
import { ArticleType } from "@api/types";
import {
  addArticleRecentlyView,
  toggleArticleBookmark,
  toggleArticleLike,
} from "./appSlice";
import { useArticleAction } from "@api/useArticleAction";
import { extractSrcFromIframe } from "@utils/text";

export const ArticleDetailScreen = () => {
  // variables
  const { layout } = useTheme();
  const { width } = useWindowDimensions();
  const contentWidth = width - layout.padding_x2 * 2;
  const {
    params: { id, type },
  } = useRoute<RouteProp<HomeStackParamList, "articleDetail">>();
  const dispatch = useAppDispatch();
  const { reset, push } = useHomeNavigation();
  const { mutate } = useArticleAction();
  const article = useAppSelector((state) => selectArticleById(state, id, type));
  const organisationId = useAppSelector(selectOrganizationId);
  const isArticleLiked = useAppSelector((state) =>
    selectIsArticleLiked(state, id)
  );
  const isArticleBookmarked = useAppSelector((state) =>
    selectIsArticleBookmarked(state, id)
  );
  const relatedArticleIds = useMemo(
    () =>
      (article?.relatedArticles || article?.relatedRecipes || []).map(
        (item) => item.id
      ),
    [article]
  );
  const relatedArticles = useAppSelector((state) =>
    selectArticlesByIdsAndType(
      state,
      relatedArticleIds,
      article?.relatedArticles ? ArticleType.Article : ArticleType.Recipe
    )
  );
  const articleType = article?.type || ArticleType.Article;

  const imageSize =
    ((layout.window.width > 400 ? 400 : layout.window.width) -
      layout.padding_x4 * 2 -
      layout.padding_x2 * 2) *
    0.4;

  // hooks
  useEffect(() => {
    dispatch(addArticleRecentlyView({ id }));
    mutate({
      organisationId,
      feedId: id,
      feedType: articleType,
      action: "view",
    });
  }, []);

  // returns
  return (
    <Container>
      <HeaderSection>
        <ContentSection>
          <DivColumn flex={1}>
            <CustomText font="bodyBold" size={16}>
              {article?.title}
            </CustomText>

            <SpacerColumn size={1} />
            <DivRow ai="center" flexWrap="wrap">
              {article?.tags.map((tag) => (
                <DivColumn
                  paddingBottom={layout.padding_x1}
                  paddingRight={layout.padding_x0_5}
                  key={tag.name}
                >
                  <TagButton
                    onPress={() =>
                      reset({
                        index: 0,
                        routes: [
                          { name: "home" },
                          { name: "tagArticles", params: { tagId: tag.id } },
                        ],
                      })
                    }
                    text={tag.name}
                  />
                </DivColumn>
              ))}
            </DivRow>
          </DivColumn>

          <DivRow>
            <ButtonWithIcon
              iconName="bookmark"
              text="Bookmark"
              isEnabled={isArticleBookmarked}
              onPress={() => {
                dispatch(toggleArticleBookmark({ id }));
                mutate({
                  organisationId,
                  feedId: id,
                  feedType: articleType,
                  action: "bookmark",
                });
              }}
            />
            <SpacerRow size={1} />
            <ButtonWithIcon
              iconName="heart"
              text="Like"
              isEnabled={isArticleLiked}
              onPress={() => {
                dispatch(toggleArticleLike({ id }));
                mutate({
                  organisationId,
                  feedId: id,
                  feedType: articleType,
                  action: "like",
                });
              }}
            />
            {/* <SpacerRow size={1} />
            <ButtonWithIcon iconName="printer" text="Print" /> */}
          </DivRow>
        </ContentSection>

        <SpacerRow size={2} />
        <CustomImage
          source={{ uri: article?.image_url }}
          style={{ width: imageSize, height: imageSize }}
        />
      </HeaderSection>

      {!!article?.podcast_embed === true && (
        <DivColumn>
          <DivColumn width="100%" height={240}>
            <WebView
              source={{
                uri: extractSrcFromIframe(article?.podcast_embed),
              }}
            />
          </DivColumn>
          <SpacerColumn size={2} />
        </DivColumn>
      )}

      {!!article?.video_embed === true && (
        <DivColumn>
          <DivColumn width="100%" height={240}>
            <WebView
              source={{
                uri: extractSrcFromIframe(article?.video_embed),
              }}
            />
          </DivColumn>
          <SpacerColumn size={2} />
        </DivColumn>
      )}

      <RenderHTML
        source={{ html: article?.content || "" }}
        contentWidth={contentWidth}
      />
      <SpacerColumn size={2} />

      <CustomText font="bodyBold">Related Articles</CustomText>
      <SpacerColumn size={2} />

      {relatedArticles.map((article) => (
        <DivColumn key={article.id}>
          <RelatedBtn
            title={article.title}
            onPress={() =>
              push("articleDetail", { id: article.id, type: articleType })
            }
          />
          <SpacerColumn size={1} />
        </DivColumn>
      ))}

      <SpacerColumn size={8} />
    </Container>
  );
};

const Container = styled.ScrollView(({ theme: { colors, layout } }) => ({
  backgroundColor: colors.primaryBackground,
  flex: 1,
  padding: layout.padding_x2,
}));

const HeaderSection = styled.View(({ theme: { colors, layout } }) => ({
  ...genericStyles.rowWithCenter,
  flex: 1,
  paddingVertical: layout.padding_x2,
  backgroundColor: colors.primaryBackground,
  borderRadius: 20,
}));

const ContentSection = styled.View(({ theme: { colors, layout } }) => ({
  flex: 1,
  justifyContent: "space-between",
}));
