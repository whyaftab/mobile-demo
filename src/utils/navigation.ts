import React from "react";
import {
  LinkingOptions,
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { StackHeaderProps } from "@react-navigation/stack";
import { ArticleType } from "@api/types";

export type RouteItem<T = RootStackParamList> = {
  name: keyof T;
  component: React.ComponentType;
  tabBarButton?: (props: BottomTabBarButtonProps) => React.ReactNode;
  headerRightIcon?: (props: StackHeaderProps) => React.ReactNode;
  header?: () => React.ReactNode;
  title?: string;
  forRole?: "only-guest" | "only-loggedin-user";
  enableRightChevron?: boolean;
};

export type AuthStackParamList = {
  signIn: undefined;
  authorise: undefined;
};

export type HomeStackParamList = {
  home: undefined;
  articles: { categoryId: number };
  articleDetail: { id: number; type: ArticleType };
  tagArticles: { tagId: number };
  likedArticles: undefined;
  bookmarkedArticles: undefined;
  recentlyVisitedArticles: undefined;
  myContentSelection: undefined;
  myContentFeed: undefined;
  htmlPage: { html: string; headerTitle: string };
  legal: undefined;
};

export type TabNavigatorParamList = {
  // home: NavigatorScreenParams<DashboardStackParamList>;
  home: undefined;
  search: undefined;
  myeap: undefined;
  chat: undefined;
};

export type RootStackParamList = {
  auth: NavigatorScreenParams<AuthStackParamList>;
  authorised: NavigatorScreenParams<TabNavigatorParamList>;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ScreenFC<T extends keyof RootStackParamList> = React.FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
}>;

export const useHomeNavigation = () =>
  useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

export const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {},
  },
  prefixes: [],
};
