// libraries
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components/native";
import { ConfirmModalProvider } from "@sj-distributor/react-native-confirm-modal";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import FlashMessage from "react-native-flash-message";
import RootNavigator from "@navigation/RootNavigator";
import { Provider } from "react-redux";
import { FullWindowOverlay } from "react-native-screens";
import { Platform, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// misc
import { theme } from "@styles/themes";
import { AccessCodeProvider } from "@context/AccessCodeProvider";
import { store } from "@redux/store";
import { DynamicHeaderProvider } from "@context/DynamicHeaderProvider";

const queryClient = new QueryClient();

const RenderOverlay: React.FC<React.PropsWithChildren> = ({ children }) =>
  Platform.OS === "ios" ? (
    <FullWindowOverlay>{children}</FullWindowOverlay>
  ) : (
    <>{children}</>
  );

export default function App() {
  // variables
  const [fontsLoaded] = useFonts({
    Medel: require("./src/assets/fonts/Medel.ttf"),
    MuseoSans: require("./src/assets/fonts/MuseoSans.ttf"),
    "OpenSans-Bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Medium": require("./src/assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Regular": require("./src/assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Light": require("./src/assets/fonts/OpenSans-Light.ttf"),
  });

  React.useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 5000);
  }, []);

  // returns
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfirmModalProvider>
          <DynamicHeaderProvider>
            <AccessCodeProvider>
              <AutocompleteDropdownContextProvider>
                <SafeAreaProvider>
                  <ThemeProvider theme={theme}>
                    <RootNavigator />
                    <RenderOverlay>
                      <FlashMessage
                        position="top"
                        hideStatusBar={false}
                        statusBarHeight={StatusBar.currentHeight}
                      />
                    </RenderOverlay>
                  </ThemeProvider>
                </SafeAreaProvider>
              </AutocompleteDropdownContextProvider>
            </AccessCodeProvider>
          </DynamicHeaderProvider>
        </ConfirmModalProvider>
      </QueryClientProvider>
    </Provider>
  );
}
