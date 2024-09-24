// libraries
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import Modal, { ModalProps } from "react-native-modal";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

// components
import { CustomIcon } from "@components/atoms";

// styles
import { genericStyles } from "@styles/genericStyles";
import { layout } from "@styles/layout";
import { theme } from "@styles/themes";
import FlashMessage, { FlashMessageManager } from "react-native-flash-message";

export interface CustomModalProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
  isDarkBackground?: boolean;
  hideClose?: boolean;
  headerContainerStyle?: StyleProp<ViewStyle>;
  renderHeader?: () => ReactNode;
  animationIn?: ModalProps["animationIn"];
  animationOut?: ModalProps["animationOut"];
  backdropColor?: string;
  containerColor?: string;
  containerStyle?: ViewStyle;
}

export const CustomModal = ({
  isVisible,
  children,
  onClose,
  isDarkBackground = false,
  renderHeader,
  headerContainerStyle,
  animationIn,
  animationOut,
  backdropColor = theme.colors.text,
  containerColor,
  containerStyle,
}: CustomModalProps) => {
  // variables

  // renders
  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={animationIn || "fadeIn"}
      animationOut={animationOut || "fadeOut"}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      backdropColor={backdropColor}
    >
      <Container color={containerColor} style={containerStyle}>
        {renderHeader !== undefined ? (
          renderHeader()
        ) : (
          <HeaderContainer onPress={onClose} style={headerContainerStyle}>
            <CustomIcon
              name="x"
              color={isDarkBackground ? "white" : "primary"}
            />
          </HeaderContainer>
        )}
        {children}
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 0,
  },
});

const Container = styled.View<{ color?: string }>(
  ({ color, theme: { colors } }) => ({
    backgroundColor: color || colors.white,
    height: "80%",
    borderRadius: 10,
  })
);

const HeaderContainer = styled.Pressable(({ theme: { layout } }) => ({
  ...genericStyles.positionAbsolute,
  top: layout.padding_x1,
  right: layout.padding_x1,
  zIndex: 2,
}));
