// libraries
import React, { useMemo } from "react";

// components
import { ArticleList } from "@components/organisms";

// misc
import { useAppSelector } from "@redux/store";
import {
  selectAllCategories,
  selectArticlesByIds,
  selectMyContentCategories,
} from "./appSelectors";
import { ArticleType } from "@api/types";

export const MyContentFeedScreen = () => {
  // variables
  const categories = useAppSelector(selectAllCategories);
  const myContentCategories = useAppSelector(selectMyContentCategories);

  const generateIdWithType = (type: ArticleType) => (id: number) => ({
    id,
    type,
  });

  const articleIdsWithType = useMemo(() => {
    let ids = [];

    categories?.forEach((cat) => {
      if (myContentCategories && cat.id in myContentCategories) {
        if (myContentCategories[cat.id] === null) {
          ids = [
            ...ids,
            ...cat.articles.map(generateIdWithType(ArticleType.Article)),
            ...cat.recipes.map(generateIdWithType(ArticleType.Recipe)),
          ];
        } else {
          cat.subcategories.forEach((subcat) => {
            if (
              myContentCategories &&
              myContentCategories[cat.id].includes(subcat.id)
            ) {
              ids = [
                ...ids,
                ...subcat.articles.map(generateIdWithType(ArticleType.Article)),
                ...subcat.recipes
                  .map((recipe) => recipe.id)
                  .map(generateIdWithType(ArticleType.Recipe)),
              ];
            }
          });
        }
      }
    });

    return ids;
  }, [categories, myContentCategories]);

  const data = useAppSelector((state) =>
    selectArticlesByIds(state, articleIdsWithType)
  );

  // returns
  return <ArticleList data={data} />;
};
