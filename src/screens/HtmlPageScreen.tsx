// libraries
import React, { useEffect } from "react";
import { useTheme } from "styled-components/native";
import RenderHTML from "react-native-render-html";
import { ScrollView, useWindowDimensions } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

// misc
import { HomeStackParamList } from "@utils/navigation";
import { useDynamicHeader } from "@context/DynamicHeaderProvider";

export const HtmlPageScreen = () => {
  // variables
  const {
    params: { html, headerTitle },
  } = useRoute<RouteProp<HomeStackParamList, "htmlPage">>();
  const { layout } = useTheme();
  const { width } = useWindowDimensions();
  const contentWidth = width - layout.padding_x2 * 2;
  const { setTitle } = useDynamicHeader();

  // hooks
  useEffect(() => {
    setTitle(headerTitle);

    return () => setTitle("");
  }, []);

  // functions

  // returns
  return (
    <ScrollView
      contentContainerStyle={{
        padding: layout.padding_x2,
      }}
    >
      <RenderHTML source={{ html: html }} contentWidth={contentWidth} />
    </ScrollView>
  );
};
