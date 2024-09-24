// libraries
import React, { useEffect, useReducer } from "react";
import styled from "styled-components/native";
import { RouteProp, useRoute } from "@react-navigation/native";

// components
import { ArticleList } from "@components/organisms";

// misc
import { useAppSelector } from "@redux/store";
import { selectLikedArticles } from "./appSelectors";

export const LikedArticlesScreen = () => {
  // variables
  const data = useAppSelector(selectLikedArticles);

  // hooks

  // functions

  // returns
  return <ArticleList data={data} />;
};

const Container = styled.View(({ theme: { colors } }) => ({
  backgroundColor: colors.secondaryBackground,
  flex: 1,
}));
