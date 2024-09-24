// libraries
import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import { ArticleDetailScreen } from "@screens/ArticleDetailScreen";
import TabNavigator from "@navigation/TabNavigator";
import { Header } from "@components/molecules";
import { ArticlesListScreen } from "@screens/ArticlesListScreen";
import { TagsArticleListScreen } from "@screens/TagsArticleListScreen";
import { LikedArticlesScreen } from "@screens/LikedArticlesScreen";
import { RecentlyVisitedArticlesScreen } from "@screens/RecentlyVisitedArticlesScreen";
import { BookmarkedArticlesScreen } from "@screens/BookmarkedArticlesScreen";
import { MyContentSelectionScreen } from "@screens/MyContentSelectionScreen";
import { MyContentFeedScreen } from "@screens/MyContentFeedScreen";
import { LegalScreen } from "@screens/LegalScreen";
import { HtmlPageScreen } from "@screens/HtmlPageScreen";
import { ChangeIcon } from "@navigation/components";

// types
import { HomeStackParamList, RouteItem } from "@utils/navigation";
import { useAccessCode } from "@context/AccessCodeProvider";
import { useDynamicHeader } from "@context/DynamicHeaderProvider";

const Stack = createStackNavigator<HomeStackParamList>();

const items: RouteItem<HomeStackParamList>[] = [
  {
    name: "home",
    component: TabNavigator,
    header: () => null,
  },
  {
    name: "articles",
    component: ArticlesListScreen,
    title: "Articles",
    enableRightChevron: true,
  },
  {
    name: "articleDetail",
    component: ArticleDetailScreen,
    title: "Articles Detail",
  },
  {
    name: "tagArticles",
    component: TagsArticleListScreen,
    title: "Tag Articles",
  },
  {
    name: "likedArticles",
    component: LikedArticlesScreen,
    title: "Liked Articles",
  },
  {
    name: "bookmarkedArticles",
    component: BookmarkedArticlesScreen,
    title: "Bookmarked Articles",
  },
  {
    name: "recentlyVisitedArticles",
    component: RecentlyVisitedArticlesScreen,
    title: "Recently Visited Articles",
  },
  {
    name: "myContentSelection",
    component: MyContentSelectionScreen,
    title: "My Content - Selection",
  },
  {
    name: "legal",
    component: LegalScreen,
    title: "Legal",
  },
  {
    name: "myContentFeed",
    component: MyContentFeedScreen,
    title: "My Content Feed",
    headerRightIcon: ({ navigation }) => (
      <ChangeIcon onPress={() => navigation.navigate("myContentSelection")} />
    ),
  },
  {
    name: "htmlPage",
    component: HtmlPageScreen,
    title: "Page",
  },
];

const HomeStack = (): ReactElement => {
  // variables
  const { initLoading } = useAccessCode();
  const { title } = useDynamicHeader();

  // returns
  if (initLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        headerTitleAlign: "center",
        animationEnabled: true,
      }}
    >
      {items.map((item) => (
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            header:
              item.header ||
              ((props) => (
                <Header
                  title={title || item.title}
                  enableRightChevron={item.enableRightChevron}
                  rightIcon={
                    item?.headerRightIcon && (() => item.headerRightIcon(props))
                  }
                />
              )),
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
