// libraries
import React, { useEffect, useReducer } from "react";
import styled from "styled-components/native";
import { RouteProp, useRoute } from "@react-navigation/native";

// components
import { ArticleList } from "@components/organisms";

// misc
import { useAppSelector } from "@redux/store";
import { selectTagArticles, selectTagById } from "./appSelectors";
import { HomeStackParamList } from "@utils/navigation";
import { useDynamicHeader } from "@context/DynamicHeaderProvider";

export const TagsArticleListScreen = () => {
  // variables
  const {
    params: { tagId },
  } = useRoute<RouteProp<HomeStackParamList, "tagArticles">>();
  const tag = useAppSelector((state) => selectTagById(state, tagId));
  const { setTitle } = useDynamicHeader();
  const data = useAppSelector((state) => selectTagArticles(state, tagId));

  // hooks
  useEffect(() => {
    setTitle("Tag: " + tag?.name);

    return () => setTitle("");
  }, [tag?.name]);

  // functions

  // returns
  return <ArticleList data={data || []} />;
};

const Container = styled.View(({ theme: { colors } }) => ({
  backgroundColor: colors.secondaryBackground,
  flex: 1,
}));
