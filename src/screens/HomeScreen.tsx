// libraries
import React, { useCallback, useMemo, useReducer, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import {
  FlatList,
  ListRenderItem,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import RenderHTML from "react-native-render-html";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// components
import {
  CustomPressable,
  CustomText,
  DivRow,
  SpacerColumn,
} from "@components/atoms";
import { BlankTile } from "./components/BlankTile";
import { HomeCategory } from "./components/HomeCategory";
import { HomeTile } from "./components/HomeTile";
import { QuestionsModal } from "@components/organisms";
import { InternetToast } from "@components/molecules";

// misc
import { genericStyles } from "@styles/genericStyles";
import { greetingText } from "@utils/time";
import { useAppSelector } from "@redux/store";
import {
  selectCategories,
  selectDynamicContent,
  selectHomeCarousel,
  selectMyContentCategories,
  selectQuestions,
  selectTiles,
} from "./appSelectors";
import { useHomeNavigation } from "@utils/navigation";
import { randomIntFromInterval } from "@utils/helpers";
import { CategoryType, LinkableType, MainDataCategory, Tile } from "@api/types";

export const HomeScreen = () => {
  // variables
  const { layout, colors } = useTheme();
  const { height, width } = useWindowDimensions();
  const carouselWidth = width - layout.padding_x4 * 4;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isQuestionsVisible, toggleQuestionsVisible] = useReducer(
    (prevValue) => !prevValue,
    false
  );
  const homeCarousel = useAppSelector(selectHomeCarousel);
  const categories = useAppSelector(selectCategories);
  const dynamicContent = useAppSelector(selectDynamicContent);

  const { navigate } = useHomeNavigation();
  const myContentCategories = useAppSelector(selectMyContentCategories);
  const tiles = useAppSelector(selectTiles);
  const questions = useAppSelector(selectQuestions);

  const mixedCategory: (MainDataCategory | Tile | null)[] = useMemo(() => {
    let values: (MainDataCategory | Tile | null)[] = [
      ...(categories || []),
      {
        id: randomIntFromInterval(1000, 9999),
        type: CategoryType.Local,
        name: "My Content",
        linkable_type: LinkableType.MyContent,
      },
      ...(tiles || []).map((tile) => ({
        ...tile,
        type: CategoryType.Local as any,
      })),
    ];

    if (values.length % 3 === 2) {
      values.push(null);
    }

    return values;
  }, [tiles, categories]);

  // functions
  const _handleOpenLink = async (link: string) => {
    if (link) {
      await WebBrowser.openBrowserAsync(link);
    }
  };

  // returns
  const renderHeader = useCallback(
    () => (
      <Content>
        <CustomText font="bodyBold" size={34}>
          {greetingText()}
        </CustomText>

        <SpacerColumn size={2} />
        <Carousel
          loop
          width={carouselWidth}
          height={160}
          autoPlay={true}
          data={homeCarousel}
          autoPlayInterval={5000}
          onProgressChange={(_, absoluteProgress) => {
            setCarouselIndex(Math.round(absoluteProgress));
          }}
          renderItem={({ item }) => (
            <RenderHTML
              source={{ html: item.text }}
              contentWidth={carouselWidth}
            />
          )}
        />

        <SpacerColumn size={0} />
        <View style={[genericStyles.jcAiCenter]}>
          <AnimatedDotsCarousel
            length={homeCarousel?.length || 1}
            currentIndex={carouselIndex}
            maxIndicators={5}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
              color: colors.secondary,
              margin: 3,
              opacity: 1,
              size: 8,
            }}
            inactiveIndicatorConfig={{
              color: colors.text,
              margin: 3,
              opacity: 0.5,
              size: 8,
            }}
            decreasingDots={[
              {
                config: {
                  color: colors.secondary,
                  margin: 3,
                  opacity: 0.5,
                  size: 6,
                },
                quantity: 1,
              },
              {
                config: {
                  color: colors.secondary,
                  margin: 3,
                  opacity: 0.5,
                  size: 4,
                },
                quantity: 1,
              },
            ]}
          />
        </View>
      </Content>
    ),
    [carouselIndex]
  );

  const renderItem: ListRenderItem<MainDataCategory | Tile> = useCallback(
    ({ item }) => {
      if (!item) {
        return <BlankTile />;
      }

      switch (item.type) {
        case CategoryType.Local:
          switch (item.linkable_type) {
            case LinkableType.Null:
              return (
                <HomeTile
                  title={item.name}
                  onPress={() => _handleOpenLink(item?.external_url || "")}
                />
              );

            case LinkableType.Page:
              return (
                <HomeTile
                  title={item.name}
                  onPress={() =>
                    navigate("htmlPage", {
                      html: item.linkable?.content || "",
                      headerTitle: item.linkable?.name || "",
                    })
                  }
                />
              );

            case LinkableType.Questionnaire:
              return (
                <HomeTile title={item.name} onPress={toggleQuestionsVisible} />
              );

            default:
              return (
                <HomeTile
                  title={item.name}
                  onPress={() =>
                    navigate(
                      myContentCategories
                        ? "myContentFeed"
                        : "myContentSelection"
                    )
                  }
                />
              );
          }

        default:
          return (
            <HomeCategory
              onPress={() => navigate("articles", { categoryId: item.id })}
              {...item}
            />
          );
      }
    },
    [mixedCategory, myContentCategories, height, width]
  );

  return (
    <>
      <InternetToast />

      <FlatList
        numColumns={3}
        contentContainerStyle={{
          backgroundColor: colors.primaryBackground,
          padding: layout.padding_x4,
        }}
        ListHeaderComponent={renderHeader()}
        data={mixedCategory}
        keyExtractor={(item) =>
          item?.id?.toString() || randomIntFromInterval(1000, 9999).toString()
        }
        extraData={[height, width]}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <SpacerColumn size={2} />}
        columnWrapperStyle={genericStyles.rowWithSB}
        ListFooterComponent={() => (
          <Footer>
            {dynamicContent?.contact_phone_number && (
              <FooterTextWrap
                onPress={() =>
                  Linking.openURL(
                    "tel:" +
                      dynamicContent.contact_phone_number.replace(" ", "")
                  )
                }
              >
                <CustomText color="secondary">
                  Helpline {dynamicContent.contact_phone_number}
                </CustomText>
              </FooterTextWrap>
            )}

            <FooterTextWrap
              onPress={() => navigate("legal")}
              pressableStyle={
                !dynamicContent?.contact_phone_number && {
                  ...genericStyles.jcAiCenter,
                  ...genericStyles.fill,
                }
              }
            >
              <CustomText color="secondary">FAQ's and Legal</CustomText>
            </FooterTextWrap>
          </Footer>
        )}
      />
      {questions?.linkable && (
        <QuestionsModal
          isVisible={isQuestionsVisible}
          onClose={toggleQuestionsVisible}
          data={questions.linkable}
          questionnaireId={questions?.linkable_id || 0}
        />
      )}
    </>
  );
};

const Content = styled.View(({ theme: { layout } }) => ({
  padding: layout.padding_x4,
}));

const Footer = styled.View(({ theme: { layout } }) => ({
  ...genericStyles.rowWithSB,
  paddingTop: layout.padding_x4,
  paddingBottom: layout.padding_x2,
}));

const FooterTextWrap = styled(CustomPressable)(({ theme: { colors } }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.secondary,
}));
