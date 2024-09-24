import { MainData } from "@api/types";

export type AppState = {
  apiData: MainData | null;
  appData: {
    article: {
      liked: number[];
      bookmarked: number[];
      recentlyVisited: number[];
    };
    myContentCategories: {
      [catId: number]: number[] | null;
    } | null;
  };
};
