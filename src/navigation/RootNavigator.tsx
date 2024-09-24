// libraries
import React, { ReactElement, useLayoutEffect } from "react";
import { useTheme } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// components
import { SignInScreen, SplashScreen } from "@screens/authentication";
import { StickyHeader } from "@components/molecules";

// types
import { RootStackParamList, RouteItem } from "@utils/navigation";
import { useFilterRoutes } from "@hooks/useFilterRoutes";
import { useAccessCode } from "@context/AccessCodeProvider";
import HomeStack from "./stacks/AppStack";
import { useSyncLocalSaves } from "@hooks/useSyncLocalSaves";

const RootItems: RouteItem<RootStackParamList>[] = [
  {
    name: "auth",
    component: SignInScreen,
    forRole: "only-guest",
  },
  {
    name: "authorised",
    component: HomeStack,
    forRole: "only-loggedin-user",
  },
];

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (): ReactElement => {
  // variables
  const { getAccessCode, initLoading } = useAccessCode();
  const modifyStack = useFilterRoutes(RootItems);
  useSyncLocalSaves();

  // // hooks
  useLayoutEffect(() => {
    getAccessCode();
  }, []);

  // // returns
  if (initLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StickyHeader />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            animationEnabled: true,
            headerShown: false,
          }}
          initialRouteName="authorised"
        >
          {modifyStack.map((item) => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
