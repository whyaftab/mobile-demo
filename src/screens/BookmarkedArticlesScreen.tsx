// libraries
import React from "react";

// components
import { ArticleList } from "@components/organisms";

// misc
import { useAppSelector } from "@redux/store";
import { selectBookmarkedArticles } from "./appSelectors";

export const BookmarkedArticlesScreen = () => {
  // variables
  const data = useAppSelector(selectBookmarkedArticles);

  // hooks

  // functions

  // returns
  return <ArticleList data={data} />;
};
