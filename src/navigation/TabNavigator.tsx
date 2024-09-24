// libraries
import React, { ReactElement, useMemo } from "react";
import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// components
import { HomeScreen } from "@screens/HomeScreen";
import { SearchScreen } from "@screens/SearchScreen";
import { CustomIcon, IconTypeProps } from "@components/atoms";
import { Header } from "@components/molecules";
import { ChatScreen } from "@screens/ChatScreen";

// types
import { RouteItem, TabNavigatorParamList } from "@utils/navigation";
import { MyEapScreen } from "@screens/MyEapScreen";
import { useAppSelector } from "@redux/store";
import { selectDynamicContent } from "@screens/appSelectors";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = (): ReactElement => {
  // variables
  const { colors } = useTheme();
  const dynamicContent = useAppSelector(selectDynamicContent);

  const TabItems: RouteItem<TabNavigatorParamList>[] = useMemo(() => {
    const screenList: RouteItem<TabNavigatorParamList>[] = [
      {
        name: "home",
        component: HomeScreen,
        header: () => null,
      },
      {
        name: "search",
        component: SearchScreen,
        title: "Search",
      },
      {
        name: "myeap",
        component: MyEapScreen,
        title: "MY EAP",
      },
    ];

    if (!dynamicContent?.hide_chat) {
      screenList.push({
        name: "chat",
        component: ChatScreen,
        title: "Chat",
      });
    }

    return screenList;
  }, [dynamicContent?.hide_chat]);

  // returns
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 1,
          borderTopColor: colors.secondary,
        },
        headerTitleAlign: "center",
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => {
          let iconWithType: IconTypeProps = {
            type: "fontawesome",
            name: "user",
          };
          let size = 30;
          let onPress: () => void | undefined;

          switch (route.name) {
            case "home":
              iconWithType["name"] = "home";
              break;

            case "myeap":
              iconWithType["name"] = "user-circle";
              break;

            case "search":
              iconWithType["name"] = "search";
              break;

            case "chat":
              iconWithType = { type: "ionic", name: "chatbox-ellipses" };
              break;

            default:
              iconWithType["name"] = "user";
              break;
          }

          // You can return any component that you like here!
          return (
            <CustomIcon
              {...iconWithType}
              size={size}
              color={focused ? "pictonBlue" : "secondary"}
              onPress={onPress}
            />
          );
        },
      })}
    >
      {TabItems.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.title,
            // headerRight: () => <RightIcons />,
            header: item.header || (() => <Header title={item.title} />),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
