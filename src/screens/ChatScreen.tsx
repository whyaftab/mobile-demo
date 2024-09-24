// libraries
import React from "react";
import WebView from "react-native-webview";
import styled from "styled-components/native";

// components
import { FullScreenLoader } from "@components/molecules";

// misc
import { DOMAIN } from "@env";

export const ChatScreen = () => {
  // variables

  // hooks

  // functions

  // returns
  return (
    <WebView
      source={{
        uri: `${DOMAIN}/chat`,
      }}
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      automaticallyAdjustContentInsets={false}
      renderLoading={() => <FullScreenLoader />}
      startInLoadingState
    />
  );
};

const Container = styled.View(({ theme: { colors } }) => ({
  backgroundColor: colors.primaryBackground,
  flex: 1,
}));
