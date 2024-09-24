// libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// misc
import { AppState } from "./types";
import { MainData } from "@api/types";

const initialState: AppState = {
  apiData: null,
  appData: {
    article: {
      liked: [],
      bookmarked: [],
      recentlyVisited: [],
    },
    myContentCategories: null,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<{ data: MainData }>) {
      state.apiData = action.payload.data;
    },
    toggleArticleLike(state, action: PayloadAction<{ id: number }>) {
      const idExist = state.appData.article.liked.includes(action.payload.id);
      if (idExist) {
        state.appData.article.liked = state.appData.article.liked.filter(
          (articleId) => articleId !== action.payload.id
        );
      } else {
        state.appData.article.liked.unshift(action.payload.id);
      }
    },
    toggleArticleBookmark(state, action: PayloadAction<{ id: number }>) {
      const idExist = state.appData.article.bookmarked.includes(
        action.payload.id
      );
      if (idExist) {
        state.appData.article.bookmarked =
          state.appData.article.bookmarked.filter(
            (articleId) => articleId !== action.payload.id
          );
      } else {
        state.appData.article.bookmarked.unshift(action.payload.id);
      }
    },
    addArticleRecentlyView(state, action: PayloadAction<{ id: number }>) {
      const idExist = state.appData.article.recentlyVisited.includes(
        action.payload.id
      );
      if (idExist) {
        state.appData.article.recentlyVisited =
          state.appData.article.recentlyVisited.filter(
            (articleId) => articleId !== action.payload.id
          );
        state.appData.article.recentlyVisited.unshift(action.payload.id);
      } else {
        state.appData.article.recentlyVisited.unshift(action.payload.id);
      }
    },
    setMyContentCategories(
      state,
      action: PayloadAction<{
        [catId: number]: number[] | null;
      }>
    ) {
      state.appData.myContentCategories = action.payload;
    },

    setAppData(state, action: PayloadAction<AppState["appData"]>) {
      state.appData = action.payload;
    },
  },
});

export const {
  setData,
  toggleArticleLike,
  toggleArticleBookmark,
  addArticleRecentlyView,
  setMyContentCategories,
  setAppData,
} = appSlice.actions;

export default appSlice.reducer;
