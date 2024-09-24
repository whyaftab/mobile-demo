// libraries
import React from "react";

// components
import { ArticleList } from "@components/organisms";

// misc
import { useAppSelector } from "@redux/store";
import { selectRecentlyVistedArticles } from "./appSelectors";

export const RecentlyVisitedArticlesScreen = () => {
  // variables
  const data = useAppSelector(selectRecentlyVistedArticles);

  // hooks

  // functions

  // returns
  return <ArticleList data={data} />;
};
