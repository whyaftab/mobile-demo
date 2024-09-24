import { ArticleType, LinkableType } from "@api/types";
import { RootState } from "@redux/store";
import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";

const app = (state: RootState) => state.app;
const categoryId = (state: RootState, categoryId: number) => categoryId;
const subCatId = (state: RootState, categoryId: number, subCatId) => subCatId;
const articleId = (state: RootState, articleId: number) => articleId;
const articleIds = (state: RootState, articleIds: number[]) => articleIds;
const articleIdsWithType = (
  state: RootState,
  articleIds: { id: number; type: ArticleType }[]
) => articleIds;
const articleType = (
  state: RootState,
  articleIds: number[],
  type: ArticleType
) => type;
const articleTypeSigleId = (
  state: RootState,
  articleId: number,
  type: ArticleType
) => type;
const tagId = (state: RootState, tagId: number) => tagId;

export const selectApiData = createDraftSafeSelector(
  [app],
  (app) => app.apiData
);

export const selectAppData = createDraftSafeSelector(
  [app],
  (app) => app.appData
);

export const selectDynamicContent = createDraftSafeSelector(
  [app],
  (app) => app?.apiData?.dynamic_content
);

export const selectHomeCarousel = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.dynamic_content.home_carousel
);

export const selectCategories = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.categories
);

export const selectTiles = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.tiles
);

export const selectQuestions = createDraftSafeSelector([app], (app) =>
  app.apiData?.tiles.find(
    (value) => value.linkable_type === LinkableType.Questionnaire
  )
);

export const selectAllArticles = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.articles
);

export const selectArticleById = createDraftSafeSelector(
  [app, articleId, articleTypeSigleId],
  (app, id, type) =>
    app.apiData?.articles.find(
      (article) => article.id === id && article.type === type
    )
);

export const selectCategoryArticles = createDraftSafeSelector(
  [app, categoryId, subCatId],
  (app, catId, subCatId) => {
    let data = app.apiData?.articles.filter(
      (article) => !!article.categories.find((cat) => cat.id === catId)
    );

    if (subCatId)
      data = data.filter(
        (article) =>
          !!article.subcategories.find((subCat) => subCat.id === subCatId)
      );

    return data;
  }
);

export const selectCategoryById = createDraftSafeSelector(
  [app, categoryId],
  (app, catId) => app.apiData?.categories.find((cat) => cat.id === catId)
);

export const selectSubCategoryById = createDraftSafeSelector(
  [app, categoryId, subCatId],
  (app, catId, subCatId) =>
    app.apiData?.categories
      ?.find((cat) => cat.id === catId)
      ?.subcategories.find((sub) => sub.id === subCatId)
);

export const selectArticlesByIds = createDraftSafeSelector(
  [app, articleIdsWithType],
  (app, idWithType) =>
    app.apiData?.articles.filter((article) =>
      idWithType.find((v) => v.id === article.id && v.type === article.type)
    )
);

export const selectArticlesByIdsAndType = createDraftSafeSelector(
  [app, articleIds, articleType],
  (app, ids, type) =>
    app.apiData?.articles.filter(
      (article) => article.type === type && ids.includes(article.id)
    )
);

export const selectTagArticles = createDraftSafeSelector(
  [app, tagId],
  (app, tagId) =>
    app.apiData?.articles.filter(
      (article) => !!article.tags.find((tag) => tag.id === tagId)
    )
);

export const selectTagById = createDraftSafeSelector(
  [app, tagId],
  (app, tagId) => app.apiData?.tags.find((tag) => tag.id === tagId)
);

export const selectAllCategories = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.categories
);

export const selectMyContentCategories = createDraftSafeSelector(
  [app],
  (app) => app.appData.myContentCategories
);

export const selectIsArticleLiked = createDraftSafeSelector(
  [app, articleId],
  (app, articleId) => app.appData.article.liked.includes(articleId)
);

export const selectIsArticleBookmarked = createDraftSafeSelector(
  [app, articleId],
  (app, articleId) => app.appData.article.bookmarked.includes(articleId)
);

export const selectOrganizationId = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.organisationId
);

export const selectSiteId = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.siteId
);

export const selectUserId = createDraftSafeSelector(
  [app],
  (app) => app.apiData?.userId
);

export const selectLikedArticles = createDraftSafeSelector([app], (app) =>
  app.apiData?.articles
    .filter((article) => app.appData.article.liked.includes(article.id))
    .sort(function (a, b) {
      return (
        app.appData.article.liked.indexOf(a.id) -
        app.appData.article.liked.indexOf(b.id)
      );
    })
);

export const selectBookmarkedArticles = createDraftSafeSelector([app], (app) =>
  app.apiData?.articles
    .filter((article) => app.appData.article.bookmarked.includes(article.id))
    .sort(function (a, b) {
      return (
        app.appData.article.bookmarked.indexOf(a.id) -
        app.appData.article.bookmarked.indexOf(b.id)
      );
    })
);

export const selectRecentlyVistedArticles = createDraftSafeSelector(
  [app],
  (app) =>
    app.apiData?.articles
      .filter((article) =>
        app.appData.article.recentlyVisited.includes(article.id)
      )
      .sort(function (a, b) {
        return (
          app.appData.article.recentlyVisited.indexOf(a.id) -
          app.appData.article.recentlyVisited.indexOf(b.id)
        );
      })
);
